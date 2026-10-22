import fs from 'fs';
import { font, sizeForCap, textPath, textWidth, wordmark, arcText, svg, rule, diamond, INK } from './engine.mjs';

export const SHIRT_RED = '#e01b24';

const line = (f, str, { cap, x, y, anchor = 'middle', tracking = 0, fill = INK }) => {
  const size = sizeForCap(f, cap);
  const { d } = textPath(f, str, { size, tracking: tracking * size, x, y, anchor });
  return `<path d="${d}" fill="${fill}"/>`;
};
const fitCap = (f, str, maxW, trackingEm = 0) => {
  const size = sizeForCap(f, 1);
  return maxW / textWidth(f, str, size, trackingEm * size);
};
const widthOf = (f, str, cap, trackingEm = 0) => {
  const size = sizeForCap(f, cap);
  return textWidth(f, str, size, trackingEm * size);
};

/* deco sunburst: even, tapered rays over a base rule */
function fan(cx, yBase, R, rays, spread, fill) {
  const out = [];
  const baseW = R * 0.072;
  for (let i = 0; i < rays; i++) {
    const t = rays === 1 ? 0.5 : i / (rays - 1);
    const ang = -90 + (t - 0.5) * spread;
    const r = R * (i % 2 === 0 ? 1 : 0.82);
    const rad = (ang * Math.PI) / 180;
    const tx = cx + r * Math.cos(rad);
    const ty = yBase + r * Math.sin(rad);
    const px = Math.cos(rad + Math.PI / 2) * baseW;
    const py = Math.sin(rad + Math.PI / 2) * baseW;
    out.push(
      `<path d="M ${(cx + px).toFixed(2)} ${(yBase + py * 0.1).toFixed(2)} L ${tx.toFixed(2)} ${ty.toFixed(2)} L ${(cx - px).toFixed(2)} ${(yBase - py * 0.1).toFixed(2)} Z" fill="${fill}"/>`
    );
  }
  out.push(`<rect x="${(cx - R * 0.55).toFixed(2)}" y="${(yBase + 1).toFixed(2)}" width="${(R * 1.1).toFixed(2)}" height="7" fill="${fill}"/>`);
  return out.join('');
}

/* ------------------------------------------------------------------ */
/*  OPTION A — "MARQUEE"                                              */
/* ------------------------------------------------------------------ */
export function aFront({ ink = INK } = {}) {
  const W = 1100, H = 1220, cx = W / 2;
  const jose = font('josefin700');
  const arch = font('archivo800');
  const body = [];

  // double arch plaque
  const px = 60, pw = W - px * 2, py = 34, ph = 1150;
  const r1 = pw / 2;
  body.push(`<path d="M ${px} ${py + ph} L ${px} ${py + r1} A ${r1} ${r1} 0 0 1 ${px + pw} ${py + r1} L ${px + pw} ${py + ph} Z" fill="none" stroke="${ink}" stroke-width="9"/>`);
  const ins = 18;
  const ipx = px + ins, ipw = pw - ins * 2, ipy = py + ins, iph = ph - ins * 1.5;
  const r2 = ipw / 2;
  body.push(`<path d="M ${ipx} ${ipy + iph} L ${ipx} ${ipy + r2} A ${r2} ${r2} 0 0 1 ${ipx + ipw} ${ipy + r2} L ${ipx + ipw} ${ipy + iph} Z" fill="none" stroke="${ink}" stroke-width="3.5"/>`);
  const innerW = ipw - 46;

  // sunburst
  body.push(fan(cx, 258, 92, 9, 104, ink));

  // wordmark
  body.push(wordmark({ cap: 62, weight: 800, tracking: 0.075, x: cx, y: 356, anchor: 'middle', fill: ink }).body);

  // divider with diamonds
  body.push(rule(cx - 252, cx + 252, 400, 4, ink));
  body.push(diamond(cx - 276, 400, 12, ink));
  body.push(diamond(cx + 276, 400, 12, ink));

  // ROARING
  const roarCap = Math.min(146, fitCap(jose, 'ROARING', innerW, 0.06));
  body.push(line(jose, 'ROARING', { cap: roarCap, x: cx, y: 580, tracking: 0.06, fill: ink }));

  // 25 + TH
  const numCap = 392;
  const numW = widthOf(jose, '25', numCap, 0);
  body.push(line(jose, '25', { cap: numCap, x: cx - 30, y: 1010, fill: ink }));
  body.push(line(arch, 'TH', { cap: 62, x: cx - 30 + numW / 2 + 10, y: 742, anchor: 'start', tracking: 0.02, fill: ink }));

  // closing rule + tagline
  body.push(rule(cx - 236, cx + 236, 1052, 4, ink));
  body.push(diamond(cx - 258, 1052, 11, ink));
  body.push(diamond(cx + 258, 1052, 11, ink));
  const tagCap = Math.min(40, fitCap(jose, 'YEARS OF COMPASSIONATE CARE', innerW - 20, 0.07));
  body.push(line(jose, 'YEARS OF COMPASSIONATE CARE', { cap: tagCap, x: cx, y: 1112, tracking: 0.07, fill: ink }));

  return svg({ w: W, h: H, body: body.join(''), inches: true });
}

export function aBack({ ink = INK } = {}) {
  const W = 400, H = 1500, cx = W / 2;
  const arch = font('archivo800');
  const body = [];

  body.push(line(arch, 'ROARING 25', { cap: 28, x: cx, y: 92, tracking: 0.2, fill: ink }));
  body.push(rule(cx - 140, cx - 36, 118, 4, ink));
  body.push(rule(cx + 36, cx + 140, 118, 4, ink));
  body.push(diamond(cx, 118, 8, ink));

  const cap = 132;
  const wm = wordmark({ cap, weight: 800, tracking: 0.055, x: 0, y: 0, fill: ink });
  const yTop = 236;
  body.push(`<g transform="translate(${(cx - cap / 2).toFixed(2)} ${yTop}) rotate(90)">${wm.body}</g>`);
  // vertical hairlines flanking the mark
  body.push(`<rect x="${(cx - cap / 2 - 30).toFixed(2)}" y="${yTop}" width="5" height="${wm.width.toFixed(1)}" fill="${ink}"/>`);
  body.push(`<rect x="${(cx + cap / 2 + 25).toFixed(2)}" y="${yTop}" width="5" height="${wm.width.toFixed(1)}" fill="${ink}"/>`);

  return svg({ w: W, h: H, body: body.join(''), inches: true });
}

/* ------------------------------------------------------------------ */
/*  OPTION B — "BLOCK"                                                 */
/* ------------------------------------------------------------------ */
export function bFront({ ink = INK } = {}) {
  const W = 1100, H = 1220, cx = W / 2;
  const anton = font('anton');
  const arch = font('archivo800');
  const body = [];
  const innerW = 944;

  body.push(wordmark({ cap: 62, weight: 800, tracking: 0.075, x: cx, y: 126, anchor: 'middle', fill: ink }).body);

  const roarCap = fitCap(anton, 'ROARING', innerW, 0.015);
  body.push(line(anton, 'ROARING', { cap: roarCap, x: cx, y: 448, tracking: 0.015, fill: ink }));
  body.push(rule(cx - innerW / 2, cx + innerW / 2, 492, 7, ink));

  const numCap = Math.min(530, fitCap(anton, '25', 720, -0.005));
  const numW = widthOf(anton, '25', numCap, -0.005);
  const numCx = cx - 30;
  body.push(line(anton, '25', { cap: numCap, x: numCx, y: 1064, tracking: -0.005, fill: ink }));
  body.push(line(arch, 'TH', { cap: 72, x: numCx + numW / 2 + 22, y: 630, anchor: 'start', tracking: 0.02, fill: ink }));

  body.push(rule(cx - innerW / 2, cx + innerW / 2, 1104, 7, ink));
  const tagCap = Math.min(58, fitCap(anton, 'YEARS OF COMPASSIONATE CARE', innerW, 0.04));
  body.push(line(anton, 'YEARS OF COMPASSIONATE CARE', { cap: tagCap, x: cx, y: 1180, tracking: 0.04, fill: ink }));

  return svg({ w: W, h: H, body: body.join(''), inches: true });
}

export function bBack({ ink = INK } = {}) {
  const W = 400, H = 1500, cx = W / 2;
  const anton = font('anton');
  const arch = font('archivo800');
  const body = [];

  body.push(wordmark({ cap: 28, weight: 800, tracking: 0.06, x: cx, y: 96, anchor: 'middle', fill: ink }).body);
  body.push(rule(cx - 150, cx + 150, 120, 5, ink));

  const cap = 188;
  const size = sizeForCap(anton, cap);
  const str = 'ROARING 25';
  const len = textWidth(anton, str, size, -0.01 * size);
  const yTop = 224;
  const { d } = textPath(anton, str, { size, tracking: -0.01 * size, x: 0, y: 0 });
  body.push(`<g transform="translate(${(cx - cap / 2).toFixed(2)} ${yTop}) rotate(90)"><path d="${d}" fill="${ink}"/></g>`);
  body.push(`<rect x="${(cx - cap / 2 - 44).toFixed(2)}" y="${yTop}" width="6" height="${len.toFixed(1)}" fill="${ink}"/>`);
  body.push(`<rect x="${(cx + cap / 2 + 38).toFixed(2)}" y="${yTop}" width="6" height="${len.toFixed(1)}" fill="${ink}"/>`);

  return svg({ w: W, h: H, body: body.join(''), inches: true });
}

export const ART = { aFront, aBack, bFront, bBack };

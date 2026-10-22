import fs from 'fs';

const DATA = JSON.parse(fs.readFileSync('/tmp/glyphs.json', 'utf8'));
export const INK = '#111111';

const ALIAS = {
  anton: 'anton-latin-400-normal',
  bebas: 'bebas-neue-latin-400-normal',
  limelight: 'limelight-latin-400-normal',
  cinzel: 'cinzel-decorative-latin-400-normal',
  cinzel7: 'cinzel-decorative-latin-700-normal',
  cinzel9: 'cinzel-decorative-latin-900-normal',
};
for (const w of [100, 200, 300, 400, 500, 600, 700, 800, 900]) {
  ALIAS[`josefin${w}`] = `josefin-sans-latin-${w}-normal`;
  ALIAS[`archivo${w}`] = `archivo-latin-${w}-normal`;
  ALIAS[`franklin${w}`] = `libre-franklin-latin-${w}-normal`;
  ALIAS[`bigsh${w}`] = `big-shoulders-display-latin-${w}-normal`;
}

const cache = new Map();
export function font(name) {
  if (typeof name !== 'string') return name;
  const key = ALIAS[name] || name;
  if (!cache.has(key)) {
    const d = DATA[key];
    if (!d) throw new Error('no font ' + name);
    cache.set(key, d);
  }
  return cache.get(key);
}

export const capH = (f) => f.cap / f.upm;
export const xH = (f) => f.xh / f.upm;
export const sizeForCap = (f, cap) => cap / capH(f);

// scale every number in a path (font units -> design units)
function scalePath(d, s) {
  return d.replace(/-?\d+(?:\.\d+)?/g, (n) => {
    const v = parseFloat(n) * s;
    return (Math.round(v * 100) / 100).toString();
  });
}

// text layout: returns glyph placements at a given size, with tracking in design units
export function layout(f, text, size, tracking = 0) {
  const s = size / f.upm;
  let x = 0;
  const out = [];
  const chars = Array.from(text.toUpperCase());
  for (let i = 0; i < chars.length; i++) {
    const g = f.glyphs[chars[i]];
    if (!g) throw new Error(`missing glyph "${chars[i]}" in font`);
    out.push({ ch: chars[i], g, x });
    x += g.adv * s + (i < chars.length - 1 ? tracking : 0);
  }
  return { glyphs: out, width: x, s };
}

export function textWidth(f, text, size, tracking = 0) {
  return layout(f, text, size, tracking).width;
}

// width per 1 unit of cap height (useful for fitting)
export function widthPerCap(f, text, trackingEm = 0) {
  const size = sizeForCap(f, 1);
  return textWidth(f, text, size, trackingEm * size);
}

// single path for a text run, positioned at baseline (x,y)
export function textPath(f, text, { size, tracking = 0, x = 0, y = 0, anchor = 'start', fill = INK }) {
  const { glyphs, width, s } = layout(f, text, size, tracking);
  const ox = anchor === 'middle' ? -width / 2 : anchor === 'end' ? -width : 0;
  const parts = glyphs.map(({ g, x: gx }) => scalePath(g.d, s).replace(/^M/, `M${''}`) );
  // rebuild as one path using translate groups is not possible; emit separate subpaths with offsets baked in
  const body = glyphs
    .map(({ ch, g, x: gx }) => {
      const dx = x + ox + gx;
      return `<g transform="translate(${dx.toFixed(2)} ${y.toFixed(2)})"><path d="${scalePath(g.d, s).trim()}" fill="${fill}"/></g>`;
    })
    .join('');
  return { body, width, d: buildD(glyphs, x + ox, y, s) };
}

// one concatenated path (all glyphs inline, offset applied numerically)
export function buildD(glyphs, ox, oy, s) {
  let out = '';
  for (const { g, x: gx } of glyphs) {
    const d = scalePath(g.d, s);
    const tx = ox + gx;
    out += offsetPath(d, tx, oy);
  }
  return out;
}

// translate a path by (tx, ty). All commands from the extractor are absolute
// with explicit letters (M/L/Q/C/Z), so args are just consecutive coordinate pairs.
export function offsetPath(d, tx, ty) {
  const tok = d.match(/[MLQCZ]|-?\d+(?:\.\d+)?/g) || [];
  const out = [];
  let i = 0;
  let pair = 0; // 0 -> x, 1 -> y
  while (i < tok.length) {
    const t = tok[i++];
    if (/[MLQCZ]/.test(t)) {
      out.push(t);
      pair = 0;
      continue;
    }
    const v = parseFloat(t) + (pair === 0 ? tx : ty);
    out.push((Math.round(v * 100) / 100).toString());
    pair ^= 1;
  }
  // re-join: commands glued to first coordinate, coordinates space separated
  let res = '';
  let needSpace = false;
  for (let k = 0; k < out.length; k++) {
    const t = out[k];
    if (/[MLQCZ]/.test(t)) {
      res += (k > 0 ? ' ' : '') + t;
      needSpace = false;
    } else {
      res += needSpace ? ' ' + t : t;
      needSpace = true;
    }
  }
  return res + ' ';
}

/* ---------- shapes ---------- */
export function svg({ w, h, body, bg = null, inches = true, bleed = 0 }) {
  const W = w + bleed * 2;
  const H = h + bleed * 2;
  const wAttr = inches ? `${(W / 100).toFixed(3)}in` : W;
  const hAttr = inches ? `${(H / 100).toFixed(3)}in` : H;
  const inner = bleed
    ? `<g transform="translate(${bleed} ${bleed})">${body}</g>`
    : body;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${wAttr}" height="${hAttr}" viewBox="0 0 ${W} ${H}">${
    bg ? `<rect x="0" y="0" width="${W}" height="${H}" fill="${bg}"/>` : ''
  }${inner}</svg>`;
}

/* ---------- Med1Care wordmark ---------- */
export function wordmark({
  cap = 100,
  weight = 800,
  tracking = 0.045,
  x = 0,
  y = 0,
  anchor = 'start',
  fill = INK,
  flag = true,
  boxStroke = 0.115,
  boxPad = 0.10,
}) {
  const f = font(`archivo${weight}`);
  const size = sizeForCap(f, cap);
  const t = tracking * size;
  const pre = 'MED', post = 'CARE';
  const wPre = textWidth(f, pre, size, t);
  const wOne = f.glyphs['1'].adv * (size / f.upm);
  const wPost = textWidth(f, post, size, t);
  const boxW = wOne + 2 * boxPad * size;
  const boxH = cap * 1.02;
  const boxTop = -cap;
  const total = wPre + t + boxW + t + wPost;
  const ox = x + (anchor === 'middle' ? -total / 2 : anchor === 'end' ? -total : 0);

  const g = [];
  g.push(textPath(f, pre, { size, tracking: t, x: ox, y }).d);
  const oneX = ox + wPre + t;
  g.push(textPath(f, '1', { size, tracking: 0, x: oneX + boxW / 2, y, anchor: 'middle' }).d);
  const bx = oneX, by = y + boxTop;
  const fw = 0.26 * size, fd = 0.15 * size;
  const boxD = flag
    ? `M ${bx} ${by} L ${bx + boxW} ${by} L ${bx + boxW} ${by + boxH} L ${bx + fw} ${by + boxH} L ${bx} ${by + boxH + fd} Z`
    : `M ${bx} ${by} L ${bx + boxW} ${by} L ${bx + boxW} ${by + boxH} L ${bx} ${by + boxH} Z`;
  g.push(`<path d="${boxD}" fill="none" stroke="${fill}" stroke-width="${(boxStroke * size).toFixed(2)}" stroke-linejoin="miter"/>`);
  g.push(textPath(f, post, { size, tracking: t, x: oneX + boxW + t, y }).d);

  return { body: `<g><path d="${g[0]}" fill="${fill}"/><path d="${g[1]}" fill="${fill}"/>${g[2]}<path d="${g[3]}" fill="${fill}"/></g>`, width: total, boxH };
}

/* ---------- arc text ---------- */
export function arcText(f, text, { cap, tracking = 0.05, cx, cy, r, centerAngle = -90, direction = 1, mode = 'top', fill = INK }) {
  const size = sizeForCap(f, cap);
  const tr = tracking * size;
  const { glyphs, s } = layout(f, text, size, tr);
  const totalW = glyphs.reduce((acc, it, i) => acc + it.g.adv * s + (i < glyphs.length - 1 ? tr : 0), 0);
  const totalAngle = (totalW / r) * (180 / Math.PI);
  let cursor = -totalAngle / 2;
  const parts = [];
  for (let i = 0; i < glyphs.length; i++) {
    const { g } = glyphs[i];
    const adv = g.adv * s;
    const mid = cursor + ((adv / 2) / r) * (180 / Math.PI);
    const ang = centerAngle + mid * direction;
    const rad = (ang * Math.PI) / 180;
    const px = cx + r * Math.cos(rad);
    const py = cy + r * Math.sin(rad);
    // mode 'top': baseline on the circle, letters grow outward (arch)
    // mode 'bottom': baseline on the circle, letters grow inward (bowl)
    const rot = mode === 'top' ? ang + 90 : ang - 90;
    const d = scalePath(g.d, s).trim();
    parts.push(`<g transform="translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${rot.toFixed(3)})"><path d="${d}" fill="${fill}"/></g>`);
    cursor += ((adv + tr) / r) * (180 / Math.PI);
  }
  return { body: parts.join(''), totalAngle, radius: r };
}

/* helpers */
export const rule = (x1, x2, y, th, fill = INK) =>
  `<rect x="${Math.min(x1, x2).toFixed(2)}" y="${(y - th / 2).toFixed(2)}" width="${Math.abs(x2 - x1).toFixed(2)}" height="${th}" fill="${fill}"/>`;

export const diamond = (cx, cy, r, fill = INK) =>
  `<path d="M ${cx} ${cy - r} L ${cx + r} ${cy} L ${cx} ${cy + r} L ${cx - r} ${cy} Z" fill="${fill}"/>`;

export const rect = (x, y, w, h, attrs = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${attrs}/>`;

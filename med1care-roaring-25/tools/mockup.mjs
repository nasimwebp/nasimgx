import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import { PNG } from 'pngjs';

// ---- homography helpers -------------------------------------------------
function solve(A, b) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    [M[i], M[p]] = [M[p], M[i]];
    const pv = M[i][i] || 1e-12;
    for (let j = i; j <= n; j++) M[i][j] /= pv;
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const f = M[k][i];
      if (!f) continue;
      for (let j = i; j <= n; j++) M[k][j] -= f * M[i][j];
    }
  }
  return M.map((r) => r[n]);
}

// maps (u,v) in [0,1]^2 -> (x,y) destination quad corners TL,TR,BR,BL
export function homography(quad) {
  const [tl, tr, br, bl] = quad;
  const src = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [u, v] = src[i];
    const [x, y] = quad[i];
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    b.push(y);
  }
  const h = solve(A, b);
  return (u, v) => {
    const d = h[6] * u + h[7] * v + 1;
    return [(h[0] * u + h[1] * v + h[2]) / d, (h[3] * u + h[4] * v + h[5]) / d];
  };
}

function bilinear(img, x, y) {
  const { width, height, data } = img;
  if (x < 0 || y < 0 || x > width - 1 || y > height - 1) return [0, 0, 0, 0];
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, width - 1), y1 = Math.min(y0 + 1, height - 1);
  const fx = x - x0, fy = y - y0;
  const out = [0, 0, 0, 0];
  for (let c = 0; c < 4; c++) {
    const p00 = data[(y0 * width + x0) * 4 + c];
    const p10 = data[(y0 * width + x1) * 4 + c];
    const p01 = data[(y1 * width + x0) * 4 + c];
    const p11 = data[(y1 * width + x1) * 4 + c];
    out[c] = (p00 * (1 - fx) + p10 * fx) * (1 - fy) + (p01 * (1 - fx) + p11 * fx) * fy;
  }
  return out;
}

// draw the print (SVG) into the tee photo with multiply-ish ink blending
export function composite({ teePath, svgString, quad, outPath, inkRGB = [24, 22, 22], inkStrength = 0.98, ss = 3 }) {
  const tee = PNG.sync.read(fs.readFileSync(teePath));
  // bounds of the destination quad
  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  const x0 = Math.floor(Math.min(...xs)) - 2, x1 = Math.ceil(Math.max(...xs)) + 2;
  const y0 = Math.floor(Math.min(...ys)) - 2, y1 = Math.ceil(Math.max(...ys)) + 2;

  // render art at supersampled size of the quad's bounding box
  const w = (x1 - x0) * ss, h = (y1 - y0) * ss;
  const art = PNG.sync.read(
    new Resvg(svgString, { fitTo: { mode: 'width', value: Math.round(w) } }).render().asPng()
  );

  const H = homography(quad);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const [dx, dy] = H((x - x0) / (x1 - x0), (y - y0) / (y1 - y0));
      // map destination coords back into the art image
      // invert: our quad is axis-aligned bounding box -> use normalized coords
      const u = (x - x0) / (x1 - x0);
      const v = (y - y0) / (y1 - y0);
      // destination point from homography given (u,v)
      const [qx, qy] = H(u, v);
      // find art pixel for (u,v)
      const ax = u * (art.width - 1);
      const ay = v * (art.height - 1);
      const [r, g, b, a] = bilinear(art, ax, ay);
      const alpha = (a / 255) * inkStrength;
      if (alpha <= 0.002) continue;
      const idx = (y * tee.width + x) * 4;
      // ink coverage from art alpha; art is black ink on transparent
      for (let c = 0; c < 3; c++) {
        const fabric = tee.data[idx + c];
        const inked = fabric * (inkRGB[c] / 255);
        tee.data[idx + c] = fabric * (1 - alpha) + inked * alpha;
      }
    }
  }
  fs.writeFileSync(outPath, PNG.sync.write(tee));
  return outPath;
}

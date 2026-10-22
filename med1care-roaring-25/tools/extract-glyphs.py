import json, os, glob
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

class AbsPen(BasePen):
    """Absolute-coordinate SVG pen: every command carries explicit letters."""
    def __init__(self, glyphSet):
        super().__init__(glyphSet)
        self.cmds = []
    def _moveTo(self, p):
        self.cmds.append('M%.2f %.2f' % p)
    def _lineTo(self, p):
        self.cmds.append('L%.2f %.2f' % p)
    def _curveToOne(self, p1, p2, p3):
        self.cmds.append('C%.2f %.2f %.2f %.2f %.2f %.2f' % (p1 + p2 + p3))
    def _qCurveToOne(self, p1, p2):
        self.cmds.append('Q%.2f %.2f %.2f %.2f' % (p1 + p2))
    def _closePath(self):
        self.cmds.append('Z')

CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .'-&,!/"
out = {}
for path in sorted(glob.glob('/tmp/fonts/*.ttf')):
    name = os.path.basename(path).replace('.ttf', '')
    f = TTFont(path)
    cmap = f.getBestCmap()
    gs = f.getGlyphSet()
    glyphs = {}
    for ch in CHARS:
        gn = cmap.get(ord(ch))
        if not gn:
            continue
        pen = AbsPen(gs)
        gs[gn].draw(TransformPen(pen, Transform(1, 0, 0, -1, 0, 0)))
        glyphs[ch] = {'d': ''.join(pen.cmds), 'adv': f['hmtx'][gn][0]}
    Os2 = f['OS/2']
    out[name] = {
        'upm': f['head'].unitsPerEm,
        'cap': getattr(Os2, 'sCapHeight', 0) or 0,
        'xh': getattr(Os2, 'sxHeight', 0) or 0,
        'glyphs': glyphs,
    }
json.dump(out, open('/tmp/glyphs.json', 'w'))
print('fonts', len(out))

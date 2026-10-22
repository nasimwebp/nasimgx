# Generator (reference)

The deliverables in `../art` are the final files — you do not need this folder to use them.
It's kept so the artwork stays editable and reproducible rather than hand-tweaked.

1. Install the fonts (Fontsource) and extract outlines:
   - `npm i @fontsource/josefin-sans @fontsource/anton @fontsource/archivo @fontsource/bebas-neue @fontsource/libre-franklin @fontsource/big-shoulders-display @fontsource/limelight @fontsource/cinzel-decorative`
   - convert the `.woff2` files to `.ttf` in `/tmp/fonts`
   - `python3 extract-glyphs.py` → writes `/tmp/glyphs.json` (absolute-coordinate SVG outlines)
2. `engine.mjs` — outline layout: tracking, cap-height fitting, arc setting, the Med1Care wordmark
   (boxed + flagged numeral 1), SVG wrappers.
3. `art3.mjs` — the four pieces of art (`aFront`, `aBack`, `bFront`, `bBack`), sized in design units
   where 100 units = 1 inch.
4. `mockup.mjs` — homography compositing of the art onto the garment photo with ink-over-fabric blending.

Type is always converted to outlines before export, so the printed files contain no live text.

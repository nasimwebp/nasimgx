# Med1Care — "Roaring 25" T-shirt concepts

Two one-colour designs for Med1Care's 25th-anniversary tee (red garment, black ink), built to replace
the Jupmode proof. Open `index.html` for the visual presentation.

## Directions

| | Front | Back |
|---|---|---|
| **A — The Marquee** | Arched anniversary emblem: wordmark, ROARING, hero 25ᵗʰ, tagline | Vertical Med1Care wordmark spine + nape "ROARING 25" |
| **B — The Roar** | Condensed block stack: wordmark, ROARING, hero 25ᵗʰ, tagline | Vertical "ROARING 25" spine + nape wordmark |

## Specs

- Ink: 1 colour, black (`#111111` art / prints as black). Flat only — no halftones, gradients or knockouts.
- Front: 11″ W × 12.2″ H, 2.3″ below collar.
- Back: 4″ W × 15″ H spine, 2.3″ below collar, plus nape mark.
- Thinnest rule: 3.5 pt at print size. Smallest type: 8 pt cap height.
- All type is converted to outlines — no live text in the art files.

## Folder map

```
index.html                 presentation / rationale page
HANDOFF.md                 email blurb + printer spec sheet
art/*.svg                  vector artwork, 1 unit = 0.01 in (viewBox in inches)
print/*-300dpi.png         raster at final print size, transparent background
mockups/*-mockup.jpg       art composited on the red tee
mockups/*-art-preview.jpg  art alone on shirt red
tools/                     how the art was generated (see below)
```

## How the art was made

`tools/` holds the generator used to produce the SVGs. Glyph outlines were extracted with `fontTools`
and placed by hand-written layout code (tracking, arc-setting, the Med1Care wordmark with its boxed
flagged `1`), so every curve is a real outline rather than raster or faked type. Re-rendering is not
required to use the deliverables — the SVGs are the final art.

Fonts used (all SIL Open Font License, via Fontsource): Josefin Sans 700, Anton, Archivo 800.

## Notes for the client

- The proof's Victorian hairlines, dotted rules and ribbon-warped "ROARING" were removed: they fill in on
  a single screen at this size.
- "Merry Christmas" was dropped so the tee can be worn year-round; a replacement fourth line
  (`EST. 2001`, the anniversary year, a partner name) is a quick swap.
- Back placement follows the existing 4″ × 15″ spine spec. A full-width horizontal back lockup is
  available on request.

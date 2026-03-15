# Delivery Specification

Use this reference to decide what to ship by default.

## Default Variants

Ship these when they make sense for the brand system:

- `primary`: the main approved logo lockup
- `mark`: icon-only or symbol-only version
- `wordmark`: text-only version when the brand name is part of the system
- `horizontal`: side-by-side lockup for headers and navigation
- `vertical`: stacked lockup for square or centered placements

If a variant is omitted, say why.

## Primary Icon Background Rule

When the `primary` variant is an app icon or contained icon:

- use either a transparent background or a background that fills the full icon silhouette/canvas
- do not place the symbol on an inset rounded rectangle or other partial background plate that leaves an outer gutter while preserving separate corner rounding
- default to square corners for the full icon container
- only use rounded corners when the user explicitly requests a platform-specific app-tile treatment

Avoid constructions like a smaller rounded rectangle centered inside the SVG with empty space around it. That reads as an accidental mockup plate rather than a finished icon background.

## Default Formats

### SVG

Always prefer SVG as the editable master.

SVG source assets should follow `svg-implementation.md`, especially for silhouette clarity, restrained geometry, and small-size legibility.

### PNG

Use transparent backgrounds for the general-purpose exported raster assets.

Suggested sizes:

- `mark`: 16, 32, 48, 64, 128, 256, 512, 1024
- `primary`, `horizontal`, `vertical`, `wordmark`: 512 and 1024 minimum, plus other sizes if requested

### JPG

Use a solid background when exporting JPG.

Default background:

- white unless the user requests a brand color or dark background package

If the local export toolchain cannot flatten transparency onto the requested color, keep the JPG export behavior honest: use white when supported or skip the JPG and report the limitation.

### Favicon

Default favicon package should include:

- `favicon.ico`
- `favicon-16.png`
- `favicon-32.png`
- `favicon-48.png`

Prefer the `mark` variant for favicon generation.

## Delivery Tree

Recommended structure:

```text
logos/
  primary/
    brand-primary.svg
    brand-primary-512.png
    brand-primary-1024.png
    brand-primary-1024.jpg
  mark/
    brand-mark.svg
    brand-mark-16.png
    brand-mark-32.png
    brand-mark-48.png
    brand-mark-64.png
    brand-mark-128.png
    brand-mark-256.png
    brand-mark-512.png
    brand-mark-1024.png
    brand-mark-1024.jpg
    favicon.ico
    favicon-16.png
    favicon-32.png
    favicon-48.png
  wordmark/
  horizontal/
  vertical/
  export-manifest.json
```

## Delivery Notes

When finishing, explain:

- which file is the editable source of truth
- which assets are optimized for favicon or app-icon use
- whether the `primary` icon uses a transparent background or a full-canvas fill
- whether the `primary` icon keeps square corners or uses user-requested corner rounding
- what background was used for JPG exports
- any missing exports and why they were skipped
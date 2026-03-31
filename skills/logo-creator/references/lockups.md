# Logo Lockup Construction

Standards for icon container and lockup variants.

## Icon Container (Critical)

The `icon.svg` file is ALWAYS a square container (1:1 aspect ratio).

**Rule: Never stretch, always pad.**

```
WRONG (stretched):          RIGHT (padded):
┌─────────────────┐         ┌─────────────────┐
│█████████████████│         │                 │
│█████████████████│         │   ██████████    │
│█████████████████│         │   ██████████    │
│█████████████████│         │                 │
└─────────────────┘         └─────────────────┘
 (distorted icon)            (icon with space)
```

**Specifications:**

- Container: Always 1:1 square
- Icon: Centered, never distorted
- Padding: Add negative space if icon shape is not square
- Minimum size: 16x16px
- Use cases: Favicons, app icons, profile pictures, watermarks

## The Two Lockups

### Stacked (Vertical)

**Aspect Ratio:** 1:1 (square to portrait)
**Use Cases:** Social media, business cards, centered layouts, print collateral

```
┌─────────────────┐
│                 │
│      ████       │
│     ██████      │
│      ████       │
│                 │
│    BRANDNAME    │
│                 │
└─────────────────┘
```

**Specifications:**

- Icon above, wordmark below
- Both centered horizontally
- Spacing between icon and wordmark: 2U to 3U (see Spacing System)
- Safe area: 10% padding on all sides
- Icon should fill 60-70% of the canvas width so it reads as the dominant element
- Wordmark width should not exceed 1.5x icon width

### Horizontal (Landscape)

**Aspect Ratio:** 3:1 to 4:1
**Use Cases:** Headers, navigation, letterhead, wide formats

```
┌──────────────────────────┐
│                          │
│    ████                  │
│   ██████    BRANDNAME    │
│    ████                  │
│                          │
└──────────────────────────┘
```

**Specifications:**

- Icon left, wordmark right
- Vertically centered alignment
- Spacing between icon and wordmark: 0.5x to 1x icon width
- Safe area: 10% padding on all sides
- Icon and wordmark optically balanced (not mathematically)
- **Fit the viewBox width to the actual content.** Measure the combined width of icon + gap + wordmark, add safe area on both sides, and set the viewBox width to that value. Do not use a fixed wide canvas (e.g. 1024) that leaves large blank areas on the right.

## Spacing System

Use a consistent spacing unit derived from the icon dimensions.

### Unit Definition

```
1 unit (U) = icon width / 8
```

### Minimum Clear Space

2U minimum around the entire logo on all sides.

### Internal Spacing (Stacked)

2U to 3U between icon bottom and wordmark top. Keep the icon and wordmark visually cohesive — they should feel like one unit, not two separate elements floating in space.

### Internal Spacing (Horizontal)

2U between icon right edge and wordmark left edge.

## Optical Alignment

Mathematical centering does not equal visual centering.

### Pointed Icons

Triangular or pointed icons need to be shifted slightly to appear centered.

### Dense vs. Open Icons

Dense icons appear heavier. Balance by reducing size slightly or increasing space around them.

### Descenders in Wordmarks

If wordmark has descenders (g, y, p, q), shift up slightly for optical balance.

## Size Specifications

### Minimum Sizes

| Lockup | Print (mm) | Digital (px) |
|--------|-----------|--------------|
| Icon Only | 10mm | 16px |
| Stacked | 20mm wide | 48px wide |
| Horizontal | 40mm wide | 80px wide |

### Recommended Sizes for Export

```
icon.svg         → viewBox: 0 0 512 512
stacked.svg      → viewBox: 0 0 512 512 (prefer square; use 512 640 only if wordmark is very long)
horizontal.svg   → viewBox width fitted to content (measure icon + gap + wordmark + safe areas)
```

## Color Variants

Each lockup should work in these color modes:

1. **Full Color** — Primary brand colors
2. **Single Color (Black)** — #000000
3. **Single Color (White)** — #FFFFFF (for dark backgrounds)
4. **Single Color (Brand)** — Primary brand color only

## File Naming Convention

```
output/
├── {brand}-icon.svg           # Icon in square container (1:1)
├── {brand}-wordmark.svg       # Isolated wordmark
├── {brand}-stacked.svg        # Vertical lockup
├── {brand}-horizontal.svg     # Horizontal lockup
└── {brand}-logo-system.json   # Metadata
```

## SVG Optimization

Before delivery, all SVGs should be:

1. **Single layer** — No unnecessary groups
2. **Cleaned paths** — Remove redundant points
3. **No transforms** — Bake all transforms into paths
4. **No live text** — All text outlined to paths
5. **Proper viewBox** — Matches content bounds
6. **No embedded styles** — Inline fills only

## Anti-Patterns

- Different spacing ratios across lockups
- Icon too small relative to wordmark
- Wordmark too long (breaks at small sizes)
- Inconsistent safe areas
- Centered text with left-aligned icon
- Complex backgrounds in logo area

## Delivery Package

### Default Variants

Ship these when they make sense for the brand system:

- `primary`: the main approved logo lockup
- `mark`: icon-only or symbol-only version
- `wordmark`: text-only version when the brand name is part of the system
- `horizontal`: side-by-side lockup for headers and navigation
- `vertical`: stacked lockup for square or centered placements

If a variant is omitted, say why.

### Primary Icon Background Rule

When the `primary` variant is an app icon or contained icon:

- Use either a transparent background or a background that fills the full icon canvas
- Do not place the symbol on an inset rounded rectangle or partial background plate
- Default to square corners; only use rounded corners when the user explicitly requests platform-specific treatment

### Default Formats

**SVG** — Always the editable master.

**PNG** — Transparent backgrounds. Suggested sizes: mark at 16, 32, 48, 64, 128, 256, 512, 1024. Primary/horizontal/vertical/wordmark at 512 and 1024 minimum.

**JPG** — Solid background (white by default unless user requests otherwise). If the toolchain cannot flatten transparency, skip JPG and report the limitation.

**Favicon** — `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`. Use the `mark` variant.

### Delivery Tree

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

### Delivery Notes

When finishing, explain:

- Which file is the editable source of truth
- Which assets are optimized for favicon or app-icon use
- Whether the primary icon uses transparent or full-canvas background
- What background was used for JPG exports
- Any missing exports and why they were skipped

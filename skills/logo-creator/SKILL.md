---
name: logo-creator
description: Create original application and brand logos from a text brief, reference images, or both, then package usable delivery assets including SVG, PNG, JPG, and favicon outputs. Use this whenever the user asks for a logo, app icon, brand mark, wordmark, lockup, favicon, or a reusable logo asset bundle, even if they only mention an app launch, startup branding, or "make me a logo" without naming file formats.
argument-hint: "[brand brief, app name, reference image path, or export request]"
---

# Logo Creator

Create production-ready logo systems from natural language input, reference images, or both, and ship them as a usable asset package.

## Scope

Use this skill for four kinds of work:

1. Create a new logo system from a text brief.
2. Create or refresh a logo using reference images as style signals.
3. Redesign an existing logo while preserving some brand equity.
4. Package existing SVG logo assets into export-ready deliverables.

The default system includes:

- `mark` — icon-only symbol in a square container
- `vertical` — stacked lockup (icon above, brand name below)
- `horizontal` — side-by-side lockup (icon left, brand name right)

Do not produce a standalone wordmark (text-only, no icon). Outlined text alone carries no distinctive brand identity — the brand name is already present in the lockup variants.

If a requested variant does not make sense, omit it and say why.

## Non-Negotiables

- Keep the idea singular. The logo should have one memorable move, not several competing ones.
- Design in black first. If the form fails in monochrome, it is not ready.
- Keep the mark original. Use references for direction, never for imitation.
- Make the mark survive small sizes, especially favicon and app-icon use.
- Outline wordmarks before delivery. Do not ship live text in SVGs.
- Keep icon containers square. Pad when needed; never distort the symbol to fill the square.

For the detailed reasoning and construction rules behind these constraints, read:

- `references/geometry.md` for shape logic and SVG implementation rules
- `references/typography.md` for wordmark selection and treatment
- `references/lockups.md` for lockup structure, spacing, and delivery variants
- `references/modernism.md` for reduction and timelessness principles

## Workflow

### 1. Parse the request

Extract the smallest set of information needed to proceed:

- brand or product name
- what it does
- intended tone or audience
- whether it must function as an app icon
- whether the user wants concept exploration, a redesign, or export-only help

Treat reference images as style signals, not templates to reproduce.

Ask follow-up questions only when missing information would materially change the result. Do not block on low-value discovery work such as long backstory or competitor analysis.

Routing:

- If the user only wants exports for existing SVGs, skip concept development and go straight to packaging.
- If the brief is strong enough, move directly to concept directions.
- If the brief is weak but recoverable, ask for the smallest missing set and continue.

### 2. Set directions

When the user needs ideation, propose 2-3 directions that differ structurally, not just stylistically. For each direction, include:

- a one-line concept summary
- why it fits the brand or product
- one tradeoff or risk

Typical direction families:

- symbol-led
- monogram or letterform-led
- emblem or combination-led

Recommend one direction by default.

- If the user wants to choose, wait for selection.
- If the user says to pick, or gives no preference signal, state the recommended direction and proceed.

### 3. Build the mark

Read `references/geometry.md` before constructing the icon.

Build from simple geometric logic:

1. Choose the base shape language.
2. Translate the brand idea into a single visual move.
3. Reduce until the silhouette reads instantly.
4. Check that the symbol still works at small sizes.
5. Keep the icon in a square container without stretching it.

### 4. Build lockups

Read `references/typography.md` before choosing type treatment for lockups.
Read `references/lockups.md` before constructing variants.

Choose a type direction that supports the symbol instead of competing with it. Keep the text simple when the symbol carries the distinction. Convert all text to outlined SVG paths.

Create the variants that are actually useful for the brief. At minimum, provide a symbol-only mark and one primary lockup. Add horizontal or vertical variants when they improve usability across product, web, or document contexts.

### 5. Package and export

Use `scripts/export-logo-assets.cjs` once the SVG sources are ready.

Single-input example:

```bash
node scripts/export-logo-assets.cjs \
  --input path/to/logo.svg \
  --output out/logos \
  --name acme
```

Multi-variant example:

```bash
node scripts/export-logo-assets.cjs \
  --variant mark=./mark.svg \
  --variant vertical=./vertical.svg \
  --variant horizontal=./horizontal.svg \
  --output out/logos \
  --name acme
```

The script writes SVG deliverables, attempts PNG and JPG exports when supported by the local toolchain, creates favicon assets when rasterization succeeds, and emits `export-manifest.json` with outputs and warnings.

Do not claim raster files exist unless the script actually produced them.

## Response Format

When you deliver work, keep the response compact and concrete:

1. State the chosen concept direction.
2. Summarize the mark and type treatment decisions.
3. List the variants delivered.
4. List the formats actually produced.
5. Call out any skipped exports or constraints.

Example:

```text
Direction:
- Symbol-led concept based on a folded triangle that suggests forward motion and precision.

Delivered:
- mark
- horizontal
- vertical

Formats produced:
- SVG for all variants
- PNG for mark and horizontal
- favicon assets from the mark

Notes:
- JPG was skipped because local flattening support was unavailable.
```

## Checklist

Before delivering, verify:

- [ ] The concept is singular and easy to describe.
- [ ] The logo works in black.
- [ ] The mark remains legible at small sizes.
- [ ] The icon container is square and undistorted.
- [ ] All text in SVGs is outlined (no live text).
- [ ] The chosen variants match the user's real usage needs.
- [ ] The SVGs follow the implementation guidance in `references/geometry.md`.
- [ ] Any claimed exports are present in `export-manifest.json`.
- [ ] Missing variants or formats are explained.

## Anti-Patterns

- copying or closely mimicking existing brand logos
- multiple ideas fighting inside one mark
- literal clip-art style symbols with no reduction
- decorative effects that carry the design instead of the form
- over-detailed geometry that collapses at small sizes
- fake inset background plates inside icon canvases
- rounded icon containers unless the user explicitly asks for them

## References

- Geometric foundations and SVG rules: `references/geometry.md`
- Typography selection and treatment: `references/typography.md`
- Lockup construction and delivery variants: `references/lockups.md`
- Modernist reduction principles: `references/modernism.md`

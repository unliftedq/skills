# SVG Implementation Rules

Use this reference when turning an approved logo direction into actual SVG.

The target is not a decorative illustration. The target is a clean, brandable symbol that feels intentional, balanced, and usable in product UI. Favor the discipline of well-made open-source icon systems over flashy gradients, overly literal drawings, or marketing-style mockups.

## Core Standard

The SVG should look like a production asset:

- simple enough to trust at a glance
- distinctive enough to avoid generic clip-art energy
- balanced enough to feel professional in an app dock, toolbar, favicon, or settings page

If the icon looks like a concept sketch, a Dribbble shot, or a decorative badge, simplify it.

## Visual Style Constraints

### 1. One dominant idea

Each mark should communicate one primary concept, or at most one concept plus one supporting cue.

Good:

- shield + vault core
- lock + path
- spark + motion arc

Bad:

- shield + lock + keyhole + letter + glow + badge outline

If multiple ideas compete, remove elements until the icon reads instantly.

### 2. Strong silhouette first

The outer shape must be recognizable before any interior detail is noticed.

- design the silhouette first
- ensure the icon still reads when interior details are removed
- avoid ragged or fussy contours

At small sizes, silhouette matters more than clever inner geometry.

### 3. Minimal primitives

Prefer a small number of shapes with clear purpose.

- circles, rounded rectangles, simple paths, clean boolean cuts
- avoid piling up many tiny path fragments
- avoid ornamental micro-details that only exist to make the icon feel “finished”

As a rule of thumb, if removing one shape does not materially hurt meaning, remove it.

### 4. Optical balance over literal symmetry

Geometric symmetry is useful, but visual balance matters more.

- correct shapes optically if one side feels heavier
- center by eye, not only by coordinates
- keep negative space distributed intentionally

The mark should feel stable and calm, not mathematically rigid in a way that looks awkward.

### 5. Restrained internal detail

Internal detail should support the main silhouette, not compete with it.

- use 1 to 3 meaningful internal structures
- prefer larger negative spaces over multiple tiny cuts
- avoid thin spokes, fine notches, tiny holes, extra rings, and decorative segments

If the symbol loses clarity below 32px, the interior is too busy.

## Geometry Rules

### 6. Use a grid and honor it

Build the SVG on a clear grid.

- keep anchor points intentional
- align major edges and centers cleanly
- use consistent spacing increments where practical

The asset does not need to expose the grid, but it should feel grid-built.

### 7. Limit point count

Use the fewest anchor points needed to describe the form.

- avoid wobbly bezier curves
- avoid hand-drawn path noise
- simplify exported paths after boolean operations when they become bloated

If a curve can be represented more simply, simplify it.

### 8. Consistent curvature language

Corner treatment must be coherent.

- if the icon uses rounded geometry, use a consistent family of radii
- if the icon is sharp, keep sharp transitions deliberate and sparse
- do not mix soft pills, hard chamfers, and random bezier bulges in one mark unless the concept demands it

### 9. Respect stroke or fill discipline

Pick a dominant construction mode and stay consistent.

- stroke-led icons should use consistent stroke weight and cap/join behavior
- fill-led icons should use solid, crisp masses with intentional cutouts
- avoid mixing unrelated stroke and fill systems in a single small icon unless there is a strong reason

For brand marks, fill-led construction is often stronger than a thin outlined drawing.

## Background and Container Rules

### 10. No fake presentation plates

Do not simulate a mockup background inside the source SVG.

- no inset rounded-square plates floating inside the canvas
- no soft framing panels added just to make the symbol “pop”
- no decorative shadows, blurred halos, or vignette tricks

If the primary icon needs a background, that background should be the actual full icon container.

### 11. Transparent by default, contained only when intentional

For symbol assets, default to transparency.

Only use a contained background when the icon is explicitly meant to function as an app icon tile or platform container. In that case:

- the container should define the full icon silhouette
- the symbol and container should feel designed together
- the symbol should not look pasted onto the background
- keep the container square by default; rounded corners require an explicit user request

## Color Rules

### 12. Color should clarify structure, not rescue it

If the icon only works when color is added, the form is not strong enough.

- verify the icon in monochrome first
- use 1 to 2 main colors in the mark unless there is a very strong reason for more
- avoid gradient dependence in core brand assets
- avoid low-contrast internal regions that collapse at small sizes

### 13. Keep contrast high

Important structural separations should remain obvious.

- ensure clear foreground/background contrast
- avoid nearly-equal adjacent tones
- make internal cutouts deliberate and readable

## Small-Size Legibility Rules

### 14. Test at favicon sizes conceptually

Before considering the SVG done, inspect whether the structure would survive at:

- 16px
- 24px
- 32px
- 48px

If a detail disappears, merge it, enlarge it, or remove it.

### 15. Prefer fewer larger shapes

For small product icons, bold simplicity wins.

- enlarge key masses
- widen small gaps
- avoid internal detail that becomes visual noise

An icon that feels slightly too simple at 1024px is often correct at 24px.

## Anti-Patterns

Avoid these common failure modes:

- generic security shield with random center detail
- a logo that looks like a dashboard illustration instead of an icon
- too many concentric rings or nested outlines
- decorative corner cuts with no semantic purpose
- symbols that rely on tiny negative-space tricks
- mixing brand mark, app icon, and presentation card into one SVG
- overfitting to a reference brand so closely that originality weakens

## Review Questions

Before finalizing, check:

- does the silhouette read immediately?
- is there one dominant idea?
- can at least one interior element be removed without harming clarity?
- does the icon still feel balanced in monochrome?
- would this still look deliberate at 24px?
- does it resemble a polished product icon rather than a decorative badge?

If any answer is no, simplify and rebalance.
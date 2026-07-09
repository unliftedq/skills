# Character Design Guide

Use this reference after the story and storyboard identify recurring characters. A character sheet (model sheet / turnaround) locks each character's look so every page can reuse the same proportions, colors, clothing, and defining features.

## Outputs

- Generate one sheet per recurring character into `characters/<name>.png`.
- Keep a written character bible entry for each recurring character.
- In review-per-step mode, get user approval before illustrating pages.
- In fully automated mode, treat generated sheets as locked after verifying they exist on disk.

Keep the same art style, palette, proportions, and line weight as the rest of the book. Put the character against a plain neutral background so the design reads clearly.

## Sheet layout

### Required turnaround views

Every character sheet must include, at minimum:

- **Front view** — neutral standing pose, arms slightly away from body.
- **3/4 front view** — rotated ~45° to show form and depth.
- **Side / profile view** — full left or right profile.
- **3/4 back view** — rotated ~135° to show the back at an angle.
- **Back view** — straight from behind.

Align all views on the same ground line at the same scale so proportions match across angles. A light height/proportion guide (head-count) is helpful.

### Additional required panels

Include these when they apply to the character:

- **Clothing / outfit breakdown** — if the character wears clothes or gear: show each garment or accessory separately (top, bottom, shoes, hat, props), plus any removable layers or alternate outfits. Call out materials, patterns, and key colors.
- **Common action poses** — 3-6 signature poses the character performs in the story (walking, running, sitting, reaching, holding a key prop, the character's defining gesture).
- **Facial expressions** — an expression sheet of 4-8 faces: neutral, happy, sad, surprised, angry/frustrated, scared, plus any story-critical expression.
- **Hands / feet or key props** (optional) — close-ups when a character has distinctive hands, paws, or a signature object.
- **Scale reference** (optional but recommended for multi-character books) — the character next to other main characters or a common object to fix relative size.

### Composition

- Group the turnaround views in a top row (front → 3/4 front → side → 3/4 back → back).
- Place the expression sheet, action poses, and clothing breakdown in labeled sections below.
- Label each panel with short text (view name / expression name) when the generator supports legible text; otherwise describe the layout in the prompt.
- Keep one character per sheet unless the user asks for a combined lineup.

## Written character bible

Alongside each sheet, keep a short text description of the character:

- Species/age or role.
- Body proportions and silhouette.
- Hair/fur/skin/clothing palette and key colors.
- Defining features that must never drift.
- Personality tics, signature gestures, and story-critical props.

Inject this text, verbatim, into every page prompt where the character appears — it is the main lever for page-to-page consistency.

## Character prompt packet

Every character-sheet generation prompt must specify:

- The chosen **art style** (or reference-image style traits), stated verbatim so it matches the book.
- The **character description** (species/age, body proportions, hair, palette, defining features).
- The explicit **view list**: front, 3/4 front, side, 3/4 back, back — all on one aligned turnaround row.
- The **outfit breakdown**, **action poses**, and **expression sheet** panels when applicable.
- **Consistent proportions and colors** across all views and panels.
- A **plain neutral background** and the target **aspect ratio**.

## Consistency checklist

Before approving a character sheet, verify:

- [ ] Front, 3/4 front, side, 3/4 back, and back views are all present and aligned.
- [ ] Proportions (head-count, limb length) are identical across every view.
- [ ] Palette and defining features match across every view and panel.
- [ ] Clothing breakdown is included if the character is clothed.
- [ ] Action poses and an expression sheet are included.
- [ ] The art style matches the rest of the book.
- [ ] A written description exists for injection into page prompts.

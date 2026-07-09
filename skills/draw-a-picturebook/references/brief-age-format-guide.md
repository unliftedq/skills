# Brief, Age & Format Guide

Use this reference while collecting the brief, writing the story, and building the storyboard. It calibrates reading level, visual density, page count, aspect ratio, and embedded text load. For concrete style traits, use [visual-style-guide.md](./visual-style-guide.md). For image prompt handoff, use [image-generation-handoff.md](./image-generation-handoff.md). For character model sheets, use [character-design-guide.md](./character-design-guide.md).

## Reference map

- **brief-age-format-guide.md**: age group, story length, page count, aspect ratio, and text density.
- **visual-style-guide.md**: medium/style choices, illustrator-indexed trait lookup, and style prompt blocks.
- **image-generation-handoff.md**: Stage 0 image capability detection, manual/tool handoff, and final image prompt packet.
- **character-design-guide.md**: character sheet layout, written character bible, and character prompt packet.

## Brief decisions

Confirm or infer these before writing the story:

| Field | Guidance |
|-------|----------|
| Target age group | `1-3`, `4-6`, `7-9`, or `10+`. Drives story length, vocabulary, visual density, and text per page. |
| Execution mode | `review-per-step` or `fully automated`. The main skill controls when to pause. |
| Page count | Fixed number or one of the age-appropriate ranges below. |
| Aspect ratio | One ratio for every page and the cover. |
| Output format | `pdf` or `slides`. |
| Art direction | Recommend an age-appropriate style before asking the user to choose. Pull concrete traits from [visual-style-guide.md](./visual-style-guide.md). |

If the user supplies reference images, extract visible style traits from them, but still respect the age-group density guidance below.

## Age group recommendations

### 1-3 (toddlers)

- **Story**: 30-120 words total. One simple idea, heavy repetition, familiar objects (animals, food, family, routines). One short sentence per page.
- **Embedded text**: Very large and sparse. Keep each page to one short line whenever possible.
- **Visuals**: Bold, chunky shapes. High contrast. Thick outlines. Flat or lightly shaded color. One clear subject per page, minimal background clutter.
- **Recommended styles**: bold flat vector, thick-outline cartoon, high-contrast board-book illustration, simple gouache shapes.

### 4-6 (preschool / early reader)

- **Story**: 150-500 words. Clear beginning-middle-end, gentle conflict, a simple emotional arc, light humor. 1-2 sentences per page.
- **Embedded text**: Large, friendly, and clearly separated from busy detail.
- **Visuals**: Friendly, rounded characters. Warm palettes. Readable backgrounds with a few supporting details. Expressive faces.
- **Recommended styles**: classic storybook watercolor, soft cel/cartoon, cut-paper collage, crayon/colored-pencil texture.

### 7-9 (early chapter / picture-rich)

- **Story**: 500-1500 words. Multi-beat plot, a real problem to solve, character growth, a bit of wit. 2-4 sentences per page.
- **Embedded text**: Moderate text blocks are acceptable, but leave intentional quiet space for readability.
- **Visuals**: More detailed scenes, dynamic composition, richer environments, some depth and lighting. Characters show varied poses and expressions.
- **Recommended styles**: detailed watercolor/ink, semi-realistic cartoon, painterly digital illustration, comic/graphic-novel-inflected panels.

### 10+ (middle grade)

- **Story**: 1500+ words or a denser illustrated narrative. Layered plot, subtler themes, stakes and consequences, distinct character voices.
- **Embedded text**: Denser text can work, but the storyboard must specify placement and contrast so the generated image stays readable.
- **Visuals**: Cinematic composition, atmosphere and mood lighting, detailed environments, stylistic ambition (limited palettes, texture, strong art direction).
- **Recommended styles**: painterly/concept-art illustration, ink-and-wash, stylized realism, graphic-novel line art with flats, atmospheric digital painting.

## Aspect ratio guidance

- `1:1` — board books, apps, social sharing; balanced single-subject compositions.
- `4:3` — classic picturebook page; comfortable for scene + short text.
- `16:9` — landscape, cinematic spreads; good for slides.
- `9:16` — portrait / phone-first reading; good for tall vertical scenes.

Keep the same aspect ratio for every page and the cover so the merged output is uniform.

## Page-count guidance

Match the page-count range to the age group when the user gives a range instead of a fixed number:

- 1-3: fewer pages (`7-9`, `10-12`).
- 4-6: `10-12`, `13-16`.
- 7-9: `13-16`, `17-20`.
- 10+: `17-20`, `21-25`.

## Storyboard requirements

Each storyboard entry must include:

- Page number.
- Exact story text to embed in the final page image.
- Visual description of the scene, including setting, characters present, action, mood, and camera framing.
- Text placement guidance: text block location, contrast needs, and areas that must stay uncluttered.
- Recurring visual motifs, if any.

The storyboard entry count must equal the final page count.

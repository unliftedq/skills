---
name: mangaka
description: Create a complete manga, comic, manhua, manhwa, webtoon, one-shot, chapter, or 4-koma from a story idea. Collect creative brief, format, target audience, reading direction, art or artist-style reference, black-and-white or color mode, single-page layout preferences, page count, lettering approach, and output format, then develop the story, manga script, name/storyboard, character designs, panel prompts, finished pages, cover, and final package. Use when the user wants to turn an idea or story into 漫画, manga pages, comic pages, webtoon episodes, or professional sequential art.
argument-hint: "[story idea, target audience/rating, format, review or fully automated mode, manga/artist style, page count, page layout, reading direction, color mode, output format]"
---

# Mangaka

Turn a story idea into finished manga-style sequential art. This workflow acts like a professional mangaka pipeline: collect the brief, shape the story for panels, write the manga script, create the `name` storyboard, lock characters and visual language, generate page prompts, produce finished pages with paneling and lettering, create a cover, and package the result.

## Scope

Use this skill when the user wants to create or resume any stage of a manga, comic, manhua, manhwa, webtoon, one-shot, chapter, or 4-koma workflow. It supports both review-per-step mode and fully automated mode.

This skill orchestrates the process and provides helper scripts for validation and CBZ packaging. It does **not** generate images itself; it relies on an available image generation capability and, when needed, an available lettering/compositing method.

## Non-Negotiables

- **Detect image generation once at the start.** Resolve the image generation method before collecting the full brief. Use that same method for character sheets, pages, cover, and any redraws unless the user explicitly switches methods.
- **Resolve the lettering route once.** Finished manga needs readable dialogue, captions, and sound effects. Confirm whether the image method can reliably render exact text. If not, choose a lettering/compositing route before page production, or produce art-first pages plus exact lettering instructions for the user's tool.
- **Honor the selected execution mode.** In review-per-step mode, stop for approval after story treatment, script, `name` storyboard, character designs, and page batch. In fully automated mode, continue unless a prerequisite, policy, tool failure, or missing user decision blocks progress.
- **Save prompts before generation.** Save the exact final prompt packet for every page to `prompts/pages/<page-number>.md`, and the exact cover prompt to `prompts/cover.md`, before sending them to the image generation method.
- **Character consistency is mandatory.** Every page must reuse the locked character designs, outfits, proportions, silhouettes, facial traits, and recurring props unless the script explicitly calls for a change.
- **Panel storytelling comes first.** Every page must have clear reading flow, panel hierarchy, gutter logic, camera variety, expressive acting, and readable silhouettes. Do not create decorative splash pages unless the script beat earns them.
- **Lock the visual bibles.** Keep the art-style bible, character bible, lettering bible, SFX bible, and recurring-setting bible stable across pages. Reuse bible text verbatim inside prompts when it applies.
- **Respect reading direction.** Japanese manga defaults to right-to-left page and panel flow; western comics default to left-to-right; webtoon defaults to top-to-bottom scroll. Do not mix directions without explicit user approval.
- **Stay within the target rating and content policy.** Keep themes, violence, gore, nudity, and language within the confirmed audience/rating. Refuse or tone down content that exceeds the rating or violates content policy instead of generating it.
- **Verify every page.** Check that panels are ordered correctly, characters remain on-model, balloons do not cover important art, dialogue/SFX are readable and correctly spelled, and page files exist before reporting completion.
- **Never claim an image or file exists unless it was actually produced.** Verify files on disk first.
- **Number pages from 1.** Page files are `1`, `2`, `3`, ... The cover is `cover`.

## Prerequisites

### 0. Detect image generation and lettering capability

Before collecting the full brief, determine how manga images and text will be produced:

1. Check whether the current agent environment has an image generation skill or tool available, such as a text-to-image, image-editing, draw, render, or design-generation capability.
2. Check whether the chosen image method can render exact readable text in speech balloons, captions, titles, and SFX.
3. If image generation is available and text rendering is reliable, use integrated page generation for finished pages.
4. If image generation is available but text rendering is unreliable, ask the user to choose one route:
   - `art-first`: generate finished panel art with empty balloons and provide exact lettering instructions.
   - `composited-lettering`: use an available local or external lettering/compositing tool after art generation.
   - `manual-lettering`: produce art pages and a lettering guide for the user to finish.
5. If no image generation method is available, stop and ask the user to specify a method, such as an MCP image tool, local model command, external API, or manual prompt handoff.

Do not collect the full creative brief until image generation and lettering routes are concrete enough to complete the requested output. See [references/image-generation-handoff.md](./references/image-generation-handoff.md) for detection, prompt parsing, lettering-route, and redraw handoff details.

## Workflow

### 1. Collect the brief

Gather the following. Ask only for missing critical details; infer sensible defaults and confirm them. If the ask-questions tool is available, use it.

| Field | Options / guidance |
|-------|--------------------|
| Story idea | A one-line idea, synopsis, scene, character concept, or existing story. Required. |
| Target audience and rating | Examples: all-ages, teen, YA, adult drama, horror, action. Drives themes, intensity, visual density, and dialogue. |
| Format | `one-shot`, `chapter`, `webtoon episode`, `4-koma`, `short comic`, `sample pages`, `cover only`. |
| Execution mode | `review-per-step` or `fully automated`. Default to `review-per-step` unless the user asks for automatic/end-to-end/no-review execution. |
| Manga tradition / reading direction | `Japanese manga RTL`, `western comic LTR`, `webtoon vertical`, `manhua/manhwa`, or user-specified. |
| Art style / artist-style reference | Examples: shonen action ink, shojo romance, seinen noir, josei slice-of-life, sports manga, horror manga, manhwa color webtoon, Chinese manhua fantasy, European clear-line, superhero comic, indie zine, chibi comedy, or user-provided artist/reference images. Translate living-artist requests into neutral visual traits. See [references/visual-style-guide.md](./references/visual-style-guide.md). |
| Single-page layout preference | Optional global or per-page layout choices: single splash, hero plus insets, two-tier cinematic, four-panel grid, six-panel grid, nine-panel grid, diagonal action page, 4-koma, webtoon scroll stack, or custom layout. See [references/manga-storyboard-guide.md](./references/manga-storyboard-guide.md). |
| Page or scroll length | Fixed number, or a range. For webtoon, collect approximate scroll beats instead of fixed print pages. |
| Black-and-white / color mode | Choose one: `black-and-white line art`, `black-and-white with screen tones`, `grayscale wash`, `spot color`, `limited palette`, `full color`, or `webtoon color`. See [references/visual-style-guide.md](./references/visual-style-guide.md). |
| Page size / aspect ratio | Print page, spread, square social comic, or vertical webtoon canvas. See the recommended sizes in [references/image-generation-handoff.md](./references/image-generation-handoff.md). |
| Output format | `numbered images`, `pdf`, `cbz`, `slides`, or `prompt pack only`. |

Create the working directory for the manga (default `./<manga-title>/`, kebab-case) and use it as the root for all outputs.

### 2. Develop the story treatment

Write `treatment.md` with:

- Title and logline
- Genre, tone, audience, and rating guardrails
- Main characters and dramatic wants
- Beginning, escalation, turning point, climax, and closing beat
- Manga-specific hook: the first page/scroll beat that earns attention
- Emotional arc and visual motifs

In review-per-step mode, present `treatment.md` and wait for approval or edits before continuing.

### 3. Write the manga script

Write `script.md` as a production script, not prose. Include one entry per page or webtoon beat with:

- Page/beat number
- Story beat purpose
- Selected page layout template or custom layout, when requested or useful
- Panel count and panel order
- Panel-by-panel action, camera, acting, and background notes
- Dialogue, captions, internal monologue, and SFX exactly as intended
- Balloon placement and reading-order notes
- Page-turn, reveal, or scroll-timing notes when relevant

Keep dialogue concise. Let acting, framing, and page turns carry as much story as possible. Use [references/manga-storyboard-guide.md](./references/manga-storyboard-guide.md) for page rhythm, panel language, and reading-direction rules. In review-per-step mode, wait for script approval.

### 4. Create the `name` storyboard

Create `name/storyboard.md`. The `name` is the rough manga storyboard and page plan. For each page or webtoon beat include:

- Page/beat number
- Selected layout template or custom layout
- Thumbnail layout described in reading order
- Exact panel count and relative panel sizes
- Eye-flow notes and intended focal point per panel
- Exact dialogue/SFX/caption text for each panel
- Balloon/caption/SFX placement guidance
- Background density and tone/screentone notes
- Transition type from prior page/beat

Also include these locked bible sections in `name/storyboard.md`:

- **Art-style bible**: line weight, inking style, hatching/screentone, rendering density, camera language, facial acting style, and locked black-and-white/color rules.
- **Lettering bible**: script/language, font or hand-lettering traits, balloon shape, tail style, caption style, emphasis rules, minimum readability, and placement rules. See [references/lettering-and-sfx-guide.md](./references/lettering-and-sfx-guide.md).
- **SFX bible**: recurring sound-effect style, translation policy if multilingual, shape integration, outline/fill rules, and when SFX may become part of the art. See [references/lettering-and-sfx-guide.md](./references/lettering-and-sfx-guide.md).
- **Panel bible**: gutter width, border style, bleed rules, splash/spread rules, reading direction, and webtoon spacing rules when relevant.
- **Scene bible**: fixed layout, landmarks, props, palette/tone, lighting, and camera orientation for recurring settings.

In review-per-step mode, present `name/storyboard.md` and wait for approval before character design.

### 5. Design characters and recurring assets

Create character sheets in `characters/`, named by character, such as `characters/akira.png`. Use [references/character-design-guide.md](./references/character-design-guide.md). For each recurring character, produce or request a sheet containing:

- Front, 3/4 front, side, 3/4 back, and back views
- Head turns and expression sheet
- Key poses and action silhouettes
- Outfit, accessories, props, and alternate states
- Line-art and tone/color notes matching the art-style bible

Write `characters/character-bible.md` with concise model notes for every recurring character. Add recurring props, vehicles, creatures, locations, logos, or costumes to `assets/` when they need visual consistency.

In review-per-step mode, present the character sheets and wait for approval before page production.

### 6. Prepare page prompt packets

For each page or webtoon beat, write the final generation prompt packet to `prompts/pages/<page-number>.md` before any generation. For a webtoon, use ordered beat numbers or canvas segment numbers.

Each prompt file must begin with YAML frontmatter containing generation parameters:

```markdown
---
size: 1024x1536
ref:
  - ../../characters/akira.png
  - ../../characters/mio.png
---

Instructions:
...
```

The Markdown body must include:

- Page/beat purpose from `script.md`
- Selected layout template or custom layout
- Locked black-and-white/color mode and palette/tone rules
- Reading direction and panel order
- Art-style bible text, reused verbatim
- Lettering bible text, reused verbatim or an art-first balloon plan
- SFX bible text when SFX appears
- Panel bible text, reused verbatim
- Relevant scene bible text, reused verbatim for recurring settings
- Character references and role descriptions using zero-based indexes matching the `ref` list
- Panel-by-panel visual instructions
- Exact dialogue, captions, and SFX for every panel
- Negative constraints, such as no extra fingers, no random text, no unplanned logos, no merged panels, no unreadable balloon text

The saved prompt packet is the source of truth for generation. When generating, parse the file and pass only the Markdown body as the text prompt, with the frontmatter `size` and resolved `ref` files as generation inputs. See [references/image-generation-handoff.md](./references/image-generation-handoff.md).

### 7. Produce finished pages

Generate one image per page or canvas segment into `manga/`, named by sequence number starting at 1: `manga/1.png`, `manga/2.png`, ...

For every page, verify:

- Page direction and panel order match the `name` storyboard
- Panel count and major panel sizes match the planned page
- Selected single-page layout matches the script and `name` storyboard
- Characters are on-model and in the correct outfits
- Recurring settings match the scene bible
- Dialogue, captions, and SFX are present, readable, correctly spelled, and assigned to the correct speaker
- Balloons, captions, and SFX do not hide the important acting or focal point
- Tone/color treatment matches the art-style bible
- Page obeys the locked black-and-white/color mode; color does not appear on monochrome pages unless explicitly planned

If the page fails a required check, regenerate or route it through the chosen lettering/compositing method before continuing.

In review-per-step mode, present the completed page batch and wait for approval before cover generation.

### 8. Create cover or title image

If the output calls for a cover, write `prompts/cover.md` before generation, then generate `cover.png`. The cover prompt must include the title, key character references, art-style bible, lettering/title treatment, target format, and any required issue/chapter/episode metadata.

Verify that `cover.png` exists and that the title text is readable before reporting it.

### 9. Validate and package the result

Run the validation script before packaging whenever page images exist:

```bash
node scripts/validate-manga-package.cjs --root ./my-manga
```

Or validate explicit directories:

```bash
node scripts/validate-manga-package.cjs --pages ./my-manga/manga --prompts ./my-manga/prompts/pages --cover ./my-manga/cover.png
```

Add `--require-docs` to also require `treatment.md`, `script.md`, `name/storyboard.md`, and `characters/character-bible.md` (otherwise their absence is reported as a warning), and `--require-cover` to require a cover. Missing story documents are surfaced so a partial project is not packaged as if complete.

Package according to the requested format:

- `numbered images`: deliver `manga/` plus `cover.png` when present.
- `prompt pack only`: deliver `treatment.md`, `script.md`, `name/storyboard.md`, `characters/character-bible.md`, and `prompts/`.
- `cbz`: archive `cover.png` and numbered page images in reading order with [scripts/package-cbz.cjs](./scripts/package-cbz.cjs). Pass the reading direction so readers open it correctly.
- `pdf`: merge with [scripts/merge-pdf.cjs](./scripts/merge-pdf.cjs).
- `slides`: merge into a `.pptx` with [scripts/merge-slides.cjs](./scripts/merge-slides.cjs).

All packaging scripts use only Node.js built-ins, accept numbered page directories, and preserve reading order.

For **webtoon** output, pages are tall vertical segments rather than print pages. Deliver the ordered segment images (`manga/1.png`, `manga/2.png`, ...) as the primary artifact, or a single stitched long-strip image when the user wants one file. CBZ and PDF still work per segment in scroll order; slides are usually a poor fit for vertical scroll.

CBZ:

```bash
node scripts/package-cbz.cjs --cover ./my-manga/cover.png --pages ./my-manga/manga --output ./my-manga/my-manga.cbz --manga rtl --title "My One-Shot"
# or package a directory of numbered page images (defaults to manga RTL):
node scripts/package-cbz.cjs ./my-manga/manga --output ./my-manga/my-manga.cbz
```

Pass `--manga rtl` for Japanese manga, `--manga ltr` for western LTR comics, or `--manga yes|no|unknown`. This is written into `ComicInfo.xml` so readers honor the page-turn direction.

PDF or slides:

```bash
node scripts/merge-pdf.cjs --cover ./my-manga/cover.png --pages ./my-manga/manga --output ./my-manga/my-manga.pdf
node scripts/merge-slides.cjs --cover ./my-manga/cover.png --pages ./my-manga/manga --output ./my-manga/my-manga.pptx
```

The scripts write machine-readable JSON to stdout and status messages to stderr.

Report final file paths only after confirming they exist on disk.

## Output Structure

```text
<manga-title>/
├── treatment.md
├── script.md
├── name/
│   └── storyboard.md
├── characters/
│   ├── character-bible.md
│   └── <character>.png
├── assets/
│   └── <recurring-asset>.png
├── prompts/
│   ├── cover.md
│   └── pages/
│       ├── 1.md
│       ├── 2.md
│       └── ...
├── manga/
│   ├── 1.png
│   ├── 2.png
│   └── ...
├── cover.png
└── <manga-title>.<pdf|cbz|pptx>
```

## Response Format

Keep responses short:

1. State the stage completed and file(s) produced.
2. Surface key decisions once after the brief: execution mode, format, target audience/rating, reading direction, style or artist-style traits, black-and-white/color mode, single-page layout preference, page/beat count, lettering route, and output format.
3. In review-per-step mode, explicitly ask the user to approve or request changes before the next stage.
4. In fully automated mode, pause only for missing prerequisites, tool failures, policy boundaries, or user intervention required to create files.

## Checklist

Before delivering the final manga, verify:

- [ ] Image generation method and lettering route were resolved before the full brief/page production.
- [ ] Brief decisions were confirmed or inferred, and the black-and-white/color mode is locked before character design.
- [ ] Content stays within the confirmed audience/rating and content policy.
- [ ] In review-per-step mode, `treatment.md`, `script.md`, `name/storyboard.md`, and character designs were each approved at their gate.
- [ ] `script.md` has one page/beat entry each with panel-by-panel action, exact dialogue/SFX, and any requested layout.
- [ ] `name/storyboard.md` matches the requested page/beat count and includes the art-style, lettering, SFX, panel, and scene bibles.
- [ ] Character sheets and `characters/character-bible.md` exist for recurring characters.
- [ ] Every page prompt exists in `prompts/pages/` before generation, with YAML `size`/`ref` frontmatter and matching zero-based `ref` descriptions.
- [ ] Pages in `manga/` are numbered from 1 with no gaps and match the storyboard's direction, panel order, count, and layout.
- [ ] Characters, outfits, props, recurring settings, and the locked color mode stay consistent on every page.
- [ ] Dialogue, captions, and SFX are readable, correctly spelled, and assigned to the correct speaker.
- [ ] Cover prompt exists and `cover.png` renders a readable title when a cover is requested.
- [ ] `validate-manga-package.cjs` passes and the final package exists on disk preserving reading order.
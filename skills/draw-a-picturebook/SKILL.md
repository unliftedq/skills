---
name: draw-a-picturebook
description: Create a complete illustrated children's picturebook from an idea. Collect story direction, target age group, execution mode, art style, page count, aspect ratio, and output format, then generate the story, storyboard, character designs, page illustrations with embedded text, and a cover, and merge them into a PDF or PPT slides. Use when the user wants to make a children's picture book, illustrated storybook, bedtime story book, 绘本, picturebook, or turn a story idea into illustrated pages.
argument-hint: "[story idea or creative direction, age group, review or fully automated mode, art style, page count, aspect ratio, output format]"
---

# Draw a Picturebook

Turn a single idea into a finished, illustrated children's picturebook. The workflow collects the creative brief, writes the story, plans a per-page storyboard, designs consistent characters, illustrates every page with its required text embedded directly in the image, adds a cover, and merges everything into a PDF or PPT slide deck.

## Scope

Use this skill when the user wants to author an illustrated picturebook end-to-end, or to resume any single stage of that pipeline (story, storyboard, character design, page illustration, cover, or final merge). It supports both review-per-step mode and fully automated mode.

This skill orchestrates the process and provides `merge-pdf` / `merge-slides` scripts. It does **not** generate images itself — it relies on an available image generation capability (see Prerequisites).

## Non-Negotiables

- **Detect image generation once at the start.** Resolve the image generation method before collecting the brief; use that same method for all character, page, and cover images. Do not re-detect in later stages.
- **Honor the selected execution mode.** In review-per-step mode, stop for approval after story, storyboard, characters, and pages. In fully automated mode, continue through every stage without intermediate review unless a tool failure or missing prerequisite blocks progress.
- **Generate final page images in one step.** Each page image must include the illustration and the necessary page text embedded directly in the image. Do not plan a separate post-processing text overlay stage.
- **Save and parse prompts before generation.** Save the exact final prompt for every page to `prompts/<page-number>.md` and the exact final cover prompt to `prompts/cover.md` before sending them to the image generation method. Each saved prompt file must start with YAML frontmatter declaring generation parameters such as `size` and the `ref` reference-image list. When generating, parse the saved Markdown file, send only the Markdown body as the text prompt, pass `size` as the image dimensions, and pass the resolved `ref` files as image references.
- **Consistency is the priority.** Every page must reuse the approved or generated character designs and the chosen art style. Pass the character sheets and style description into every page-generation request.
- **Lock typography once.** Choose one book-wide embedded-text treatment before page generation: script/language, font or lettering traits, weight, case, color, outline/shadow, and spacing. Reuse that typography block verbatim in every page and cover prompt unless the storyboard explicitly calls for a different recurring text device.
- **Lock recurring scenes.** When multiple pages share the same place, create a scene bible entry before page generation and reuse its fixed layout, palette, landmarks, props, lighting rules, and camera orientation in every prompt for that scene.
- **Age-appropriate everything.** Vocabulary, sentence length, theme complexity, visual density, and amount of embedded text must match the target age group.
- **Never claim an image or file exists unless it was actually produced.** Verify files on disk before reporting completion.
- **Number pages from 1.** Page files are `1`, `2`, `3`, … The cover is `cover`.

## Prerequisites

### 0. Detect image generation capability (do this first)

Before collecting any brief, determine how images will be generated:

1. Check whether the current agent environment has an image generation skill or tool available (for example a skill/tool whose description mentions image generation, text-to-image, or `draw` / `render` capabilities).
2. If one is available, use it for all character and page generation.
3. If none is available, **stop and ask the user** to specify an image generation method (for example: an MCP image tool, a local model command, an external API they will run, or manual generation where the agent produces prompts and the user supplies the images).

Do not collect the creative brief until a concrete image generation method is confirmed. Use the confirmed method for the whole run. See [references/image-generation-handoff.md](./references/image-generation-handoff.md) for detection heuristics and prompt-handoff patterns.

### Node.js

Required to run the merge scripts (`scripts/merge-pdf.cjs`, `scripts/merge-slides.cjs`). The scripts use only Node.js built-ins — no `npm install` needed.

```bash
node --version
```

## Workflow

### 1. Collect the brief

Gather the following. Ask only for what is missing; infer sensible defaults and confirm them. If the ask-questions tool is available, use it.

| Field | Options / guidance |
|-------|--------------------|
| Story overview | A one-line idea, a synopsis, or a rough creative direction. Required. |
| Target age group | `1-3`, `4-6`, `7-9`, `10+`. Drives vocabulary, story length, and visual density. |
| Execution mode | `review-per-step` or `fully automated`. Default to `review-per-step` unless the user asks for automatic/end-to-end/no-review execution. |
| Art style | Recommend styles per age group (see [references/visual-style-guide.md](./references/visual-style-guide.md)). The user may also supply reference image(s) as a style anchor. |
| Page count | Fixed number, or a range: `7-9`, `10-12`, `13-16`, `17-20`, `21-25`. |
| Aspect ratio | `1:1`, `4:3`, `16:9`, `9:16`. |
| Output format | `pdf` or `slides`. |

Recommend an art style based on the chosen age group before asking the user to pick. If reference images are provided, describe the extracted style traits and reuse them in every generation prompt.

Create the working directory for the book (default `./<book-title>/`, kebab-case) and use it as the root for all outputs.

### 2. Write the story

Using the overview, age group, and target page count, write the full story to `story.md` in the working directory. Match reading level to the age group (see [references/brief-age-format-guide.md](./references/brief-age-format-guide.md) for word-count guidance). Structure the story so it naturally divides into the target number of pages (setup, rising action, turn, resolution).

In review-per-step mode, present `story.md` and **wait for user approval or edits** before continuing. In fully automated mode, continue to storyboard immediately.

### 3. Storyboard

Based on the approved story, break it into one entry per page and write `storyboard.md`. For each page include:

- Page number
- The exact story text that must be embedded in the final page image
- A visual description of the scene (setting, characters present, action, mood, camera framing)
- Text placement guidance (title/text block location, contrast needs, and areas that must stay uncluttered)
- Any recurring visual motifs

Also include two locked consistency sections in `storyboard.md`:

- **Typography bible**: one book-wide embedded-text treatment describing script/language, font or lettering traits, weight, case, color, outline/shadow, spacing, and legibility rules. Keep this block byte-for-byte identical in every page prompt and the cover prompt.
- **Scene bible**: one entry for each recurring setting shared by multiple pages. Each entry must name the scene ID and fix its spatial layout, key landmarks, recurring props, palette, lighting/time-of-day rules, camera orientation, and any details that must not drift. Reference the scene ID from every storyboard page that uses it.

The number of storyboard entries must equal the final page count. In review-per-step mode, present `storyboard.md` and **wait for user approval** before continuing. In fully automated mode, continue to character design immediately.

### 4. Character design

From the story and chosen style, design each recurring character. For every character, generate a full character sheet into the `characters/` directory, named by character (e.g. `characters/luna.png`). Each sheet must follow [references/character-design-guide.md](./references/character-design-guide.md): a turnaround with front, 3/4 front, side, 3/4 back, and back views, plus a clothing/outfit breakdown (when the character is clothed), common action poses, and a facial-expression sheet. Keep a short written description of each character (appearance, palette, defining traits) so it can be injected into page prompts.

In review-per-step mode, present the character sheets and **wait for user approval** before continuing. Do not start page illustration until characters are locked. In fully automated mode, treat the generated character sheets as locked after verifying they exist on disk.

### 5. Illustrate pages

Generate one image per storyboard page into the `picturebook/` directory, named by sequence number starting at 1: `picturebook/1.png`, `picturebook/2.png`, …

Before calling the image generation method for each page, write the final prompt packet to `prompts/<page-number>.md` (for example, `prompts/1.md`, `prompts/2.md`). The saved prompt must be the source of truth for generation. It must follow the prompt file structure below, then be parsed according to [references/image-generation-handoff.md](./references/image-generation-handoff.md) before the generator is called.

For every page prompt, include:

- The chosen art style (or reference-image style traits)
- The locked typography bible entry, reused verbatim for embedded story text
- The approved character designs for characters in the scene (for consistency)
- The relevant scene bible entry when the page uses a recurring setting, reused verbatim except for page-specific action and framing
- The scene description from the storyboard
- The exact page text to embed in the image, with text placement guidance and a requirement for clear, readable, correctly spelled typography
- The chosen aspect ratio or size

#### Prompt file structure

Every saved page prompt must use this Markdown structure:

1. YAML frontmatter declaring generation parameters. Include `size` as concrete pixel dimensions compatible with the chosen aspect ratio, and `ref` as a list of reference-image paths only. Use `../` paths from the `prompts/` directory. Include relevant `../characters/<name>.png` character sheets and any user-supplied style or content reference images. Do not put textual sources such as `storyboard.md` in `ref`; include storyboard-derived text in the Markdown body instead.
2. Markdown body containing the full text prompt sent to the generator. The body should use clear sections such as `Instructions:`, `Reference images:`, `Style:`, `Typography:`, `Scene continuity:`, and `Embedded text:` as needed. In `Reference images:`, describe each `ref` image by zero-based index (`[0]`, `[1]`, …) in the same order as the frontmatter `ref` list so the generator can connect each image input to its role.

Keep the style, typography, reference-image role descriptions, and scene continuity text byte-for-byte identical across pages when they refer to the same asset or setting. The page-specific instructions may vary action, emotion, and framing, but they must not contradict the locked scene continuity text.

Example:

```markdown
---
size/ratio: 1024x768 (or 16:9)
ref:
	- ../characters/luna.png
	- ../characters/timo.png
	- ../references/style-watercolor.png
---

Instructions:
Detailed scene description for page 1, including setting, characters, action, mood, and camera framing.

Reference images:
- [0] Luna: A small, curious fox with a bushy tail and bright eyes, wearing a tiny scarf.
- [1] Timo: A tall, gentle bear with a round belly and a friendly smile, wearing a vest.
- [2] Style: Watercolor, soft edges, pastel palette, whimsical and playful.
...
```

Generate pages in order. Verify each file lands on disk before moving on. If a page drifts from the established style, characters, typography, or recurring scene bible, or if embedded text is missing, misspelled, garbled, or unreadable, regenerate it before continuing. In review-per-step mode, present the generated pages and **wait for user approval** before cover generation. In fully automated mode, continue to cover generation immediately after local verification.

### 6. Cover

After all pages are done, write the final cover prompt packet to `prompts/cover.md`, then generate the cover into the working directory as `cover.png` (title-friendly composition with the book title embedded in the image, key characters, chosen style, locked typography treatment, and aspect ratio). The saved cover prompt must be the source of truth for `cover.png`, must follow the same prompt file structure as page prompts, and must be parsed according to [references/image-generation-handoff.md](./references/image-generation-handoff.md) before the generator is called.

### 7. Merge

Merge the cover plus numbered pages into the requested output format using the provided scripts. The cover is placed first.

PDF:

```bash
node scripts/merge-pdf.cjs --cover ./cover.png --pages ./picturebook --output ./my-book.pdf
# or merge a directory of numbered page images:
node scripts/merge-pdf.cjs ./picturebook --output ./my-book.pdf
```

Slides (PPTX):

```bash
node scripts/merge-slides.cjs --cover ./cover.png --pages ./picturebook --output ./my-book.pptx
# or merge a directory of numbered page images:
node scripts/merge-slides.cjs ./picturebook --output ./my-book.pptx
```

Both scripts:

- Accept `--cover <file>` (optional, placed first) and `--pages <dir>` (files named `1.png`, `2.png`, … sorted numerically).
- Accept a directory argument containing numbered files (`1.png`, `2.png`, …) sorted numerically.
- Accept PNG and JPEG images.
- Write a machine-readable summary to stdout and status to stderr.

Report the final file path only after confirming it exists on disk.

## Output Structure

```
<book-title>/
├── story.md              # Stage 2
├── storyboard.md         # Stage 3
├── characters/           # Stage 4 (character sheets)
│   └── <character>.png
├── prompts/              # Stage 5-6 (final image prompts)
│   ├── 1.md
│   ├── 2.md
│   └── cover.md
├── picturebook/          # Stage 5 (numbered pages)
│   ├── 1.png
│   ├── 2.png
│   └── ...
├── cover.png             # Stage 6
└── <book-title>.pdf|pptx # Stage 7
```

## Response Format

Keep responses short:

1. State the stage just completed and the file(s) produced.
2. Surface the key decisions (execution mode, age group, style, page count, aspect ratio) once, at stage 1.
3. In review-per-step mode, explicitly ask the user to approve or request changes before the next stage.
4. In fully automated mode, only pause for missing prerequisites, tool failures, or user intervention required to create files.

## Checklist

Before delivering the final book, verify:

- [ ] Image generation method was detected or explicitly chosen before collecting the brief.
- [ ] The brief (execution mode, age group, style, page count, aspect ratio, format) was confirmed or inferred.
- [ ] In review-per-step mode, `story.md` was approved by the user.
- [ ] `storyboard.md` has exactly one entry per page and includes exact embedded page text.
- [ ] `storyboard.md` includes a typography bible for consistent embedded text across pages and cover.
- [ ] `storyboard.md` includes scene bible entries for every recurring setting shared by multiple pages.
- [ ] In review-per-step mode, `storyboard.md` was approved by the user.
- [ ] Character sheets exist in `characters/`.
- [ ] In review-per-step mode, character sheets were approved by the user.
- [ ] Each character sheet includes front, 3/4 front, side, 3/4 back, and back views, plus expressions and action poses (and a clothing breakdown when clothed).
- [ ] Every page has its final generation prompt saved as `prompts/<page-number>.md` before image generation.
- [ ] Every saved page prompt starts with YAML frontmatter declaring `size` and a `ref` list of reference images used by that prompt.
- [ ] Every saved page prompt describes each `ref` image in the Markdown body using matching zero-based indexes.
- [ ] Every page generation request parses the saved prompt into Markdown-body prompt text, `size`, and resolved `ref` image inputs before calling the generator.
- [ ] Every page in `picturebook/` is numbered from 1 with no gaps.
- [ ] Every page reuses the approved characters and style.
- [ ] Every page reuses the locked typography treatment unless an approved recurring text device says otherwise.
- [ ] Every page using a recurring setting matches that setting's scene bible entry.
- [ ] Every page image contains its required embedded text and the text is readable.
- [ ] In review-per-step mode, generated pages were approved by the user.
- [ ] The final cover generation prompt is saved as `prompts/cover.md` before cover generation.
- [ ] The saved cover prompt starts with YAML frontmatter declaring `size` and a `ref` list of reference images used by the cover prompt.
- [ ] The saved cover prompt describes each `ref` image in the Markdown body using matching zero-based indexes.
- [ ] The cover generation request parses `prompts/cover.md` into Markdown-body prompt text, `size`, and resolved `ref` image inputs before calling the generator.
- [ ] `cover.png` exists.
- [ ] The merged PDF/PPTX exists on disk and page order is cover-first.

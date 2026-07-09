# Image Generation and Lettering Handoff

Use this reference at Stage 0 and whenever producing character, page, cover, or redraw prompts. The mangaka skill orchestrates work; it needs a confirmed method that can create images and a confirmed route for exact readable lettering.

## Stage 0 Contract

- Resolve image generation before collecting the full creative brief.
- Resolve lettering before page production.
- Reuse the same generation method across character sheets, pages, cover, and redraws unless the user explicitly changes it.
- Never claim an image exists until the expected file is present on disk.

## Detection Order

Check the current environment for:

1. Skills or tools whose descriptions mention image generation, text-to-image, image editing, draw, render, diffusion, comic, manga, or illustration.
2. MCP servers exposing image generation or image editing functions.
3. Built-in image generation in the active agent environment.
4. Local commands or user-provided external APIs.

If exactly one method is available, use it. If several are available, ask the user to choose. If none are available, stop and ask the user to provide a method or choose manual prompt handoff.

## Lettering Routes

Use one route for the whole project unless the user changes direction:

- **Integrated lettering**: Use only when the image generator reliably renders exact dialogue, captions, title text, and SFX.
- **Art-first**: Generate pages with clean empty balloons, caption boxes, and SFX spaces. Provide exact lettering instructions for each page.
- **Composited lettering**: Generate art-first pages, then use a local or external layout/compositing tool to add exact text.
- **Manual lettering**: Save complete text maps and balloon/SFX placement so the user can letter pages in another tool.

When in doubt, prefer art-first or composited lettering; unreadable text is a delivery failure.

## Recommended Generation Sizes

Pick a `size` for the prompt frontmatter from the target format, then keep it stable across the project. These are practical defaults, not hard rules; match the generator's supported sizes and the user's requested aspect ratio.

| Format / use | Aspect | Suggested `size` |
|--------------|--------|------------------|
| Print manga page (B5/A5 feel) | ~2:3 portrait | `1200x1800` |
| Tall single-page manga | ~5:8 portrait | `1024x1536` |
| Two-page spread | ~3:2 landscape | `2400x1600` |
| Square social comic | 1:1 | `1440x1440` |
| Webtoon segment | tall vertical | `800x1280` per segment (stack multiple) |
| 4-koma strip (vertical) | tall narrow | `900x1600` |
| Cover (portrait) | ~2:3 portrait | `1600x2400` |
| Character turnaround sheet | wide | `1920x1080` or wider |

Notes:

- Keep every interior page in one aspect ratio; do not mix portrait and landscape pages unless the story calls for a spread.
- For webtoon, generate several vertical segments at the same width and stack them; do not paste a print page into a scroll.
- Larger is safer for legible lettering; downscale for delivery rather than generating too small.

## Prompt Packet Parsing

Before calling an image method, read the saved Markdown prompt packet from disk:

- Page prompts: `prompts/pages/<page-number>.md`
- Cover prompt: `prompts/cover.md`

Parse it into:

- **Prompt text**: Markdown body after YAML frontmatter. Send only this body to the image generator.
- **Image size**: frontmatter `size` value. Pass it to the generator when supported.
- **Reference images**: resolved paths from the frontmatter `ref` list. Resolve them relative to the prompt file and verify each exists before generation.

Do not include YAML frontmatter in the generation prompt text.

## Prompt Packet Checks

Before generation, verify:

- [ ] The prompt file exists.
- [ ] YAML frontmatter contains `size` and `ref`.
- [ ] The Markdown body is non-empty.
- [ ] Every `ref` path resolves to an existing image file.
- [ ] Every `ref` image is described in the body using matching zero-based indexes: `[0]`, `[1]`, ...
- [ ] The target output path is named in or known from the prompt packet.

## Redraw Handoff

For failed pages, preserve everything that worked and change only the failing requirements. Name the defect precisely:

- wrong panel count or page flow
- character drift or outfit drift
- unreadable or misspelled text
- missing balloon tail or wrong speaker
- inconsistent setting, prop, or tone treatment
- unwanted extra text, logos, marks, or merged panels

Save redraw prompts next to the original prompt as `prompts/pages/<page-number>-redraw-<n>.md` when the page needs more than one attempt.
# Image Generation Detection & Handoff

Use this reference at Stage 0 and whenever building image prompts. The picturebook skill does not generate images itself; it needs a confirmed method that turns prompts into character sheets, final page images, and a cover.

## Stage 0 contract

- Resolve the image generation method **once at the very beginning, before collecting the creative brief**.
- Reuse that same method for character sheets, page images, and the cover.
- Do not repeat capability detection in later stages unless the selected method fails or the user explicitly changes it.
- Do not fabricate images or claim files exist. Verify every expected output path on disk before reporting completion.

## Detection order

Check the current agent environment for an image generation capability in roughly this order:

1. **Skills** whose name or description mentions image generation, text-to-image, illustration rendering, `draw`, `render`, `diffusion`, or similar.
2. **Tools / MCP servers** exposing an image generation function (names containing `image`, `generate_image`, `text_to_image`, `dalle`, `imagen`, `flux`, `sd`, etc.).
3. **Built-in multimodal generation** if the running model/agent can emit images directly.

If exactly one capability is found, use it for the whole run. If several are found, briefly tell the user which options exist and let them pick.

## Handoff methods

If no image generation capability is available, **stop and ask the user** to choose one of:

- **MCP / tool**: they enable an image generation MCP server or tool, then you call it.
- **Local model command**: they provide a CLI command (e.g. a local diffusion runner). You produce the prompt; they or a task runs the command to write the file.
- **External API**: they run an API call you construct and save the returned image to the expected path.
- **Manual**: you output the full prompt for each image; the user pastes it into their own tool and drops the resulting file into the expected path (`characters/<name>.png`, `picturebook/<n>.png`, `cover.png`).

When using the manual path, generate all prompts up front where possible so the user can batch the work, save page and cover prompts under `prompts/`, and clearly list the exact output filename each prompt maps to.

## Parse saved prompts

The main skill defines the `prompts/*.md` file structure and prompt body requirements. This reference only describes how to parse those saved prompt files before invoking the selected image generation method.

Before sending any page or cover prompt to the image generation method, read the saved prompt from disk:

- Page prompts: `prompts/<page-number>.md` (`prompts/1.md`, `prompts/2.md`, …).
- Cover prompt: `prompts/cover.md`.

Parse the saved Markdown file into three inputs:

- **Prompt text**: the Markdown body after the frontmatter. Send only this body text to the image generator; do not include the YAML frontmatter in the text prompt.
- **Image size**: the frontmatter `size` value. Pass it as the requested output dimensions when the selected image generation method supports explicit dimensions.
- **Reference images**: the resolved file paths from the frontmatter `ref` list. Resolve paths relative to the saved prompt file, verify each file exists, and pass them through the image generation method's image-reference mechanism. If the selected method does not support image references, surface that limitation and ask the user whether to continue with text-only descriptions or switch methods.

## Verification

Before each image generation request:

- Confirm the saved prompt file exists in `prompts/` and corresponds to the target image file named in the Markdown body.
- Confirm the saved prompt starts with YAML frontmatter containing `size` and a `ref` list.
- Confirm the `size` value is passed as the requested output dimensions when supported by the selected generation method.
- Confirm each `ref` entry resolves relative to the prompt file and points to an existing image file.
- Confirm each `ref` entry has a matching zero-based reference-image description in the Markdown body.
- Confirm the parsed Markdown body is non-empty and is the only text sent to the generator.
- Confirm the resolved `ref` files are passed as image-reference inputs when the selected generation method supports them.

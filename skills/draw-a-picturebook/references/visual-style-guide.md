# Picturebook Art Styles

Use this reference to choose and preserve the book's visual language. The output of this file is a **style prompt block**: a concise trait list repeated verbatim in character-sheet, page, and cover prompts.

## How to choose a style

1. Start with the target age group and density guidance from [brief-age-format-guide.md](./brief-age-format-guide.md).
2. Recommend one or two suitable style directions before asking the user to choose.
3. If the user names a short style like "watercolor" or "手绘", expand it into medium, line, texture, palette, lighting, composition, and typography traits.
4. If the user supplies reference images, extract visible traits from them: medium, edges, texture, palette, line weight, lighting, composition, and text treatment.
5. If the user names an illustrator, studio, brand, or existing book, use it only to find or infer neutral traits. Do not pass the name to image generation.

## Style prompt block rules

- State the chosen style's full trait list verbatim in every character-sheet, page, and cover prompt.
- Keep palette, line weight, medium, rendering technique, and text treatment identical across all pages and character sheets.
- Convert text treatment into a separate locked typography block before page generation: script/language, font or lettering traits, weight, case, color, outline/shadow, spacing, and readability constraints. Reuse it verbatim in every page and cover prompt.
- If using an illustrator-indexed recipe, strip the illustrator name and pass only the `Prompt traits` text to image generation.
- Do not ask the generator to imitate a specific artist, studio, living illustrator, copyrighted character, or existing book.
- Do not mix styles page to page unless the book intentionally uses a recurring device, such as flashbacks in a different medium, and then apply that device consistently.

## Typography consistency

Embedded page text is part of the illustration, so choose its visual treatment before generating pages. Use a font name only when the user provides one or the generation method can reliably honor it; otherwise describe the lettering traits precisely enough to stay consistent.

The typography block should specify:

- Script/language and reading direction.
- Font or lettering traits, such as rounded hand-lettered sans, soft brush calligraphy, blocky cut-paper letters, or neat classroom print.
- Weight, case, approximate size range, line spacing, and text alignment.
- Fill color, outline, shadow, backing shape, or paper label treatment.
- Placement rules for contrast and uncluttered safe areas.
- A strict requirement for clear, readable, correctly spelled text.

Reuse this block verbatim in every page and cover prompt. If a special recurring text device is needed, such as a sign, handwritten note, or chapter label, define it once and reuse that device consistently too.

## Age group quick picks

- **1-3**: flat vector / bold graphic, gouache, cut-paper collage, crayon.
- **4-6**: watercolor, soft cel/cartoon, cut-paper collage, hand-drawn, handcrafted.
- **7-9**: watercolor, oil painting, hand-drawn, ink-and-wash, painterly digital.
- **10+**: oil painting, ink-and-wash, painterly digital, graphic-novel line art.

## Medium style library

Grouped by medium and visual traits. Each entry lists the traits to name in prompts and the age groups it suits best. Styles can be combined deliberately (e.g. "gouache + cut-paper collage").

### Painting
- **Watercolor** (水彩) — soft translucent washes, blooming/bleeding edges, visible paper grain, gentle gradients, light pencil under-drawing. Warm and cozy. Best for 1-3, 4-6, 7-9.
- **Gouache** (水粉) — opaque matte paint, flat-but-textured shapes, chalky saturated color, crisp brush edges. Bold and friendly. Best for 1-3, 4-6.
- **Oil painting** (油画) — thick impasto brushstrokes, rich blended color, painterly light, canvas texture, warm depth. Classic and atmospheric. Best for 7-9, 10+.
- **Acrylic** (丙烯) — punchy opaque color, crisp layered edges, slight brush texture, vivid contrast. Best for 4-6, 7-9.
- **Soft / oil pastel** (色粉/油画棒) — grainy blended chalk or waxy buttery strokes, soft glowing color, dreamy texture. Best for 1-3, 4-6, 7-9.
- **Airbrush / soft gradient** (喷绘) — smooth sprayed gradients, glowing soft edges, dreamy retro finish. Best for 7-9, 10+.

### Drawing
- **Hand-drawn / pencil & ink** (手绘) — visible line work, crosshatching, colored-pencil or crayon fills, sketchy energetic strokes, textured paper. Intimate and expressive. Best for 4-6, 7-9.
- **Crayon / colored pencil** (蜡笔/彩铅) — waxy or grainy strokes, layered scribble shading, childlike warmth, slightly uneven color. Best for 1-3, 4-6.
- **Charcoal / graphite** (炭笔/铅笔) — soft smudged tonal shading, expressive smoky grays, dramatic contrast. Best for 7-9, 10+.
- **Marker (Copic)** (马克笔) — smooth alcohol-marker flats with blended gradients, clean confident lines, bright and modern. Best for 4-6, 7-9.
- **Ink-and-wash / line + watercolor** (钢笔淡彩) — confident ink outlines with loose watercolor fills, expressive and airy. Best for 7-9, 10+.
- **Scratchboard** (刮画) — white lines scratched from black, engraving-like texture, high drama. Best for 7-9, 10+.

### Print & craft
- **Woodcut / linocut / block print** (木刻版画) — bold carved shapes, chunky textured lines, limited ink colors, handmade grain. Best for 4-6, 7-9, 10+.
- **Risograph / screen print** (Riso/丝网) — grainy overlapping spot colors, slight misregistration, retro zine feel. Best for 7-9, 10+.
- **Cut-paper / collage** (剪纸拼贴) — layered paper shapes with visible edges and drop shadows, mixed textures (fabric, newsprint), handcrafted depth. Best for 1-3, 4-6.
- **Papercraft / 3D paper diorama** (立体纸艺) — folded and layered paper scenes with real depth and soft shadows, tactile stage-set look. Best for 4-6, 7-9.
- **Quilling** (衍纸) — rolled and coiled paper strips forming shapes, delicate dimensional pattern. Best for 4-6, 7-9.
- **Felt / wool / fabric** (羊毛毡/布艺) — soft needle-felted or stitched-fabric characters, fuzzy tactile texture, cozy warmth. Best for 1-3, 4-6.
- **Embroidery / stitched** (刺绣) — thread-textured shapes, visible stitches, folk-craft charm. Best for 4-6, 7-9.
- **Clay / plasticine (claymation)** (黏土) — sculpted 3D characters with fingerprint texture, soft studio light, playful roundness. Best for 1-3, 4-6.
- **Stained glass** (彩色玻璃) — bold black leading around glowing translucent color panes, luminous and graphic. Best for 4-6, 7-9.
- **Batik / tie-dye** (蜡染) — wax-resist dyed patterns, crackle texture, rich folk color. Best for 7-9, 10+.
- **Silhouette / shadow** (剪影) — flat backlit silhouettes against glowing skies, elegant and moody. Best for 4-6, 7-9, 10+.

### Digital & graphic
- **Flat vector / bold graphic** (扁平矢量) — clean flat shapes, limited palette, thick or no outlines, geometric simplicity. Modern and legible. Best for 1-3, 4-6.
- **Soft cel / cartoon** (卡通) — rounded characters, clean outlines, cel-shaded flats with gentle gradients, animation-inspired. Best for 4-6, 7-9.
- **Painterly digital illustration** (数字绘画) — rendered digital brushwork, soft lighting, depth and atmosphere, cinematic color. Best for 7-9, 10+.
- **Graphic-novel line art** (绘本漫画线稿) — strong ink line work with flat or lightly shaded color, panel-friendly, dynamic. Best for 10+.
- **Comic / manga** (漫画) — expressive screentones or flats, big emotive eyes, speed and motion lines, panel energy. Best for 7-9, 10+.
- **Chibi / kawaii** (Q版/可爱) — super-deformed big-head proportions, tiny bodies, ultra-cute rounded shapes, pastel candy palette. Best for 1-3, 4-6.
- **Pixel art** (像素) — crisp low-resolution grid pixels, limited palette, retro-game charm. Best for 7-9, 10+.
- **Low-poly / isometric 3D** (3D渲染) — faceted or clean rendered 3D forms, soft ambient light, toy-like depth. Best for 4-6, 7-9.
- **Vintage / mid-century retro** (复古) — limited flat palette, textured print grain, 1950s-60s storybook charm. Best for 4-6, 7-9.

### Cultural & traditional
- **Chinese ink painting** (水墨/写意) — expressive brush strokes, flowing negative space, tonal black ink with occasional color washes, calligraphic energy. Best for 7-9, 10+.
- **Gongbi fine-line** (工笔) — meticulous fine outlines, delicate layered color washes, refined elegance. Best for 7-9, 10+.
- **Dunhuang mural / fresco** (敦煌壁画) — earthy mineral pigments, ornate patterns, warm aged texture, mythic grandeur. Best for 7-9, 10+.
- **Japanese sumi-e** (日式水墨) — minimal expressive ink brushwork, generous empty space, meditative calm. Best for 7-9, 10+.
- **Ukiyo-e woodblock** (浮世绘) — flat outlined color areas, decorative wave/cloud patterns, elegant line, layered print texture. Best for 7-9, 10+.
- **Folk / naive art** (民间/素人) — flat frontal compositions, bold decorative pattern, bright unshaded color, joyful simplicity. Best for 1-3, 4-6, 7-9.

## Illustrator-indexed trait recipes

Use these recipes when the user wants a recognizable art direction but did not name a medium. The illustrator name is an internal lookup index only. When writing prompts for image generation, **do not include the illustrator name or ask for that artist's style**; pass only the `Prompt traits` text, plus any age-group and story-specific constraints.

- **Eric Carle** — Prompt traits: hand-painted tissue-paper collage, torn and cut edges, bold simple shapes, bright saturated color, visible layering, joyful handmade imperfections. Best for 1-3, 4-6.
- **Beatrix Potter** — Prompt traits: fine pencil underdrawing, translucent watercolor, muted botanical palette, softly rendered animals and plants, small countryside details, calm open compositions. Best for 4-6, 7-9.
- **Quentin Blake** — Prompt traits: scratchy expressive pen line, splashy watercolor fills, wobbly lively silhouettes, lots of white space, playful motion and comic timing. Best for 4-6, 7-9.
- **Maurice Sendak** — Prompt traits: detailed ink hatching, warm earth tones, richly textured interiors or forests, slightly wild shapes, cozy-but-mysterious fantasy atmosphere. Best for 4-6, 7-9.
- **Dr. Seuss** — Prompt traits: curvy elastic linework, invented plants and architecture, limited punchy palette, exaggerated silhouettes, playful visual rhythm. Best for 4-6, 7-9.
- **Oliver Jeffers** — Prompt traits: naive charming figures, muted retro palette, mixed-media textures, spare backgrounds, handwritten-feeling text treatment, gentle humor. Best for 4-6, 7-9.
- **Jon Klassen** — Prompt traits: flat simple shapes, muted earth palette, subtle paper grain, sparse backgrounds, understated expressions, quiet deadpan staging. Best for 4-6, 7-9.
- **Shaun Tan** — Prompt traits: painterly detail, atmospheric light, unusual scale relationships, dreamlike architecture or landscapes, sophisticated color scripting. Best for 7-9, 10+.
- **Chris Van Allsburg** — Prompt traits: careful tonal drawing, strong chiaroscuro, realistic forms, quiet surreal staging, deep shadow and spotlight composition. Best for 7-9, 10+.
- **Rebecca Dautremer** — Prompt traits: refined painterly rendering, graceful poses, rich costumes or interiors, controlled jewel or dusky palette, theatrical lighting. Best for 7-9, 10+.
- **Beatrice Alemagna** — Prompt traits: bold uneven shapes, layered mixed-media textures, fabric/paper/paint marks, tactile surfaces, emotionally direct faces. Best for 4-6, 7-9.
- **Leo Lionni** — Prompt traits: simple torn-paper collage, minimal animal or object forms, warm gentle palette, clear negative space, quiet fable-like staging. Best for 1-3, 4-6.
- **Roger Duvoisin** — Prompt traits: simplified geometric shapes, warm limited palette, decorative pattern blocks, stylized animal characters, screen-printed grain. Best for 1-3, 4-6.
- **Ezra Jack Keats** — Prompt traits: painted and cut-paper textures, strong color contrast, patterned clothes and walls, warm everyday city scenes, graphic composition. Best for 4-6, 7-9.
- **Tove Jansson** — Prompt traits: delicate black line, soft washes, cozy interiors or quiet landscapes, muted cool-warm palette, tender contemplative mood. Best for 4-6, 7-9.
- **Mary Blair** — Prompt traits: flat mid-century shapes, jewel-tone color blocks, stylized graphic characters, decorative motifs, theatrical layout. Best for 1-3, 4-6.
- **Lisbeth Zwerger** — Prompt traits: light transparent watercolor, minimal backgrounds, precise small gestures, lots of negative space, elegant muted palette. Best for 7-9, 10+.
- **Wolf Erlbruch** — Prompt traits: textured mixed-media collage, earthy palette, spare surreal props, thoughtful mood, rough paper grain. Best for 4-6, 7-9.
- **Kveta Pacovska** — Prompt traits: abstract shapes, high-contrast color fields, playful scale shifts, collage-like typography, energetic page design. Best for 4-6, 7-9.
- **Sydney Smith** — Prompt traits: loose watercolor and ink, rain or window light, cinematic framing, expressive city atmosphere, soft edges and reflected color. Best for 7-9, 10+.
- **Carson Ellis** — Prompt traits: matte gouache, decorative borders and patterns, muted folk palette, crisp shapes, careful botanical or domestic details. Best for 4-6, 7-9.
- **Jimmy Liao** — Prompt traits: detailed urban-whimsy scenes, solitary figures, dreamy cinematic framing, melancholic-yet-warm color, quiet magical realism. Best for 7-9, 10+.
- **Xiong Liang** — Prompt traits: expressive Chinese ink-brush strokes, flowing negative space, warm mineral accents, folk motifs adapted into modern scenes. Best for 7-9, 10+.
- **Cai Gao** — Prompt traits: folk-art warmth, earthy saturated palette, gouache and woodcut-inflected shapes, rural textures, decorative patterning. Best for 4-6, 7-9.
- **Zhu Chengliang** — Prompt traits: realistic but softened characters, rich festive color, tender everyday scenes, clear emotional acting, readable domestic or community settings. Best for 4-6, 7-9.
- **Yu Rong** — Prompt traits: crisp paper-cut silhouettes, delicate pencil shading, layered white shapes over gentle color fields, decorative negative space. Best for 4-6, 7-9.
- **Chen Jiang Hong** — Prompt traits: bold Chinese ink-and-brush painting, sweeping strokes, strong silhouettes, warm mineral pigments, mythic intensity. Best for 7-9, 10+.
- **Suzy Lee** — Prompt traits: expressive charcoal marks, dynamic black-and-white staging, one or two accent colors, visible smudges, strong movement. Best for 4-6, 7-9.
- **Komako Sakai** — Prompt traits: grainy acrylic or oil-pastel texture, dim warm lighting, small close-up moments, muted dusk palette, quiet tender mood. Best for 1-3, 4-6.
- **Akiko Miyakoshi** — Prompt traits: soft charcoal and muted collage, warm dim interiors, quiet storybook atmosphere, gentle shadow, restrained palette. Best for 4-6, 7-9.

For story length, visual density, aspect ratio, and page-count pacing per age group, see [brief-age-format-guide.md](./brief-age-format-guide.md).

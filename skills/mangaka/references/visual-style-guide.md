# Manga Visual Style Guide

Use this reference when recommending or locking an art-style bible.

## Style Families

- **Shonen action ink**: bold silhouettes, speed lines, impact frames, exaggerated poses, strong black fills, crisp facial reactions.
- **Shojo romance**: elegant lines, expressive eyes, floral or symbolic backgrounds, delicate screen tones, soft panel transitions.
- **Seinen noir**: restrained acting, dense blacks, realistic proportions, sharp lighting, textured hatching, cinematic framing.
- **Gekiga drama**: grounded anatomy, heavy texture, observational backgrounds, mature pacing, controlled expressions.
- **Josei slice-of-life**: elegant but grounded figures, quiet expressions, fashion detail, naturalistic interiors, soft emotional pacing.
- **Sports manga**: kinetic bodies, repeated action poses, sweat/impact detail, speed-line grammar, strong readable motion arcs.
- **Mecha / technical sci-fi**: precise hard-surface drawing, mechanical silhouettes, cockpit inserts, labeled props only when intentional, high detail control.
- **Dark fantasy / horror manga**: high-contrast blacks, organic textures, unsettling negative space, distorted silhouettes, controlled gore/intensity by rating.
- **Iyashikei / cozy manga**: gentle pacing, soft line, spacious backgrounds, warm everyday gestures, low visual noise.
- **Gag manga / 4-koma**: simplified designs, readable silhouettes, strong facial exaggeration, clean repeated layouts.
- **Chibi comedy**: short proportions, high expressiveness, simple backgrounds, big readable emotions.
- **Manhwa/webtoon color**: vertical composition, clean color rendering, rim light, controlled gradients, spacious scroll timing.
- **Chinese manhua fantasy**: ornate costumes, flowing hair and fabric, decorative effects, elegant action poses, full-color drama.
- **European bande dessinee**: clear-line drawing, carefully staged environments, graphic color blocks, readable adventure compositions.
- **American superhero comic**: muscular anatomy, dynamic foreshortening, bold inks, dramatic lighting, splash-panel energy.
- **Noir crime comic**: silhouettes, venetian-blind shadows, smoke/rain texture, heavy negative space, terse cinematic framing.
- **Underground / alt comic**: expressive distortion, rough line confidence, personal texture, unconventional panel rhythm.
- **Editorial graphic novel**: restrained palette, strong shape design, documentary-like staging, controlled typography.
- **Indie zine**: handmade line, risograph or photocopy texture, expressive imperfection, graphic compositions.

## Artist-Style References

The user may ask for an artist, studio, era, publication, or movement as a style anchor. Handle these safely and practically:

- Use **public-domain or historical artists** directly when appropriate, while adapting the result to manga/comic production needs.
- For **living artists or contemporary copyrighted styles**, do not ask the generator to copy the artist exactly. Translate the request into neutral visual traits: line weight, anatomy, palette, rendering density, camera language, panel rhythm, facial acting, texture, and subject-matter tone.
- When the user provides reference images, describe visible traits rather than naming imitation as the goal.
- Combine at most 2-3 anchors. Too many references usually produce unstable pages.
- Record the final derived style as an **art-style bible** and reuse that text verbatim in page prompts.

Useful artist-style dimensions to extract:

- line: delicate, brushy, scratchy, geometric, clear-line, heavy ink, dry-brush, loose pencil
- anatomy: chibi, elongated shojo, grounded realist, heroic exaggeration, rubber-hose, angular graphic
- rendering: flat color, cel shade, screentone, crosshatch, watercolor wash, risograph texture, painterly color
- composition: cinematic widescreen, dense page grid, poster-like splash, quiet observational, ornamental, chaotic action
- emotion: melodramatic, restrained, comedic, eerie, romantic, documentary, surreal
- era/material: 1960s manga print, 1980s OVA, 1990s screentone, modern webtoon, photocopied zine, vintage newspaper strip

Example transformation:

```text
Instead of: "in the exact style of [living artist]"
Use: "expressive brush-ink linework, elongated figures, elegant negative space, high-fashion clothing detail, soft romantic screentone, cinematic close-ups, and restrained pastel accents."
```

## Style Menus

When the user has not supplied a style, offer a compact menu based on format and tone:

- **Action one-shot**: shonen action ink, seinen noir, sports manga, American superhero comic, dark fantasy manga.
- **Romance/drama**: shojo romance, josei slice-of-life, editorial graphic novel, manhwa/webtoon color.
- **Comedy**: gag manga, 4-koma, chibi comedy, underground / alt comic, vintage newspaper strip traits.
- **Fantasy/adventure**: Chinese manhua fantasy, European bande dessinee, shonen adventure ink, dark fantasy manga.
- **Personal/essay**: indie zine, editorial graphic novel, clear-line memoir, risograph alt comic.

## Black-and-White / Color Modes

Lock one color mode before character design and page prompts. Do not let pages drift between monochrome and color unless the story explicitly calls for a recurring device, such as one red object in an otherwise black-and-white chapter.

- **Black-and-white line art**: pure ink line and solid black fills, no gray wash or screentone. Best for clean action, comedy, newspaper-strip influence, and high-readability prompt packs.
- **Black-and-white with screen tones**: manga-standard monochrome with halftone dots, hatching, speed lines, gradients, and tone sheets. Best default for print manga.
- **Grayscale wash**: soft gray values, ink wash, pencil shading, or digital gray paint. Best for drama, horror, memoir, and quiet atmosphere.
- **Spot color**: mostly black-and-white with one recurring accent color, such as red blood, blue magic, gold eyes, or a symbolic object. Define exactly where spot color is allowed.
- **Limited palette**: 2-5 controlled colors plus black/white. Best for zine, editorial graphic novel, risograph, poster-like pages, or stylish short comics.
- **Full color**: complete color rendering with a stable palette, lighting model, and material rules. Best for covers, manhua, western comics, and premium one-shots.
- **Webtoon color**: mobile-first full color with clean shading, consistent character palettes, readable faces, and vertical-scroll lighting continuity.

### Mode Selection Defaults

- Default Japanese print manga to **black-and-white with screen tones** unless the user asks otherwise.
- Default 4-koma to **black-and-white line art** or **limited palette** depending on output channel.
- Default webtoon/manhwa to **webtoon color** unless the user asks for monochrome.
- Default cover art to **full color** only if it does not conflict with a requested monochrome package.
- If the user says only "black and white", ask or infer whether they mean pure line art, screentone manga, or grayscale wash.

### Color Bible Fields

Record these in the art-style bible:

- mode name
- allowed values or palette
- black-fill and white-space rules
- screentone, hatching, or wash rules
- spot-color permissions, if any
- lighting and shadow model
- whether cover and interior pages share the same mode
- forbidden drift, such as random full-color panels in a monochrome chapter

## Art-Style Bible Fields

Lock these before page prompts:

- line weight and brush feel
- black-fill strategy
- hatching and screentone rules
- anatomy and proportion style
- facial acting and eye style
- background density
- camera language
- black-and-white/color mode and palette rules
- texture/noise/grain rules
- recurring motif treatment
- artist/reference anchors translated into reusable visual traits

## Black-and-White Manga Rules

- Reserve solid blacks for focus, silhouette, mood, and composition balance.
- Use screentone families consistently; do not change tone density randomly between pages.
- Keep speech balloons white unless the story requires stylized balloons.
- Avoid muddy midtones that make lettering or expressions hard to read.
- Use speed lines and impact bursts to clarify motion, not to hide unclear anatomy.

## Full-Color Comic Rules

- Define character palettes before page generation and keep them stable.
- Keep lighting consistent inside recurring scenes.
- Use color contrast to support focal points and reading order.
- Avoid over-rendering backgrounds when dialogue and acting need priority.
- Keep speech balloons and captions high contrast against the art.

## Webtoon Color Rules

- Design for mobile-first vertical reading.
- Use larger character faces and cleaner backgrounds than print pages.
- Keep palettes consistent across recurring scenes.
- Leave vertical breathing room for timing, tension, and reveals.
- Avoid tiny text, crowded panels, and full-page print layouts pasted into a scroll.

## Style Prompt Block

When writing page prompts, keep the style block stable. Include:

```text
Art style: [style family]. Color mode: [black-and-white line art / black-and-white with screen tones / grayscale wash / spot color / limited palette / full color / webtoon color]. Line work: [...]. Rendering: [...]. Tone/color: [...]. Camera language: [...]. Background density: [...]. Do not drift into a different manga/comic tradition or color mode unless requested.
```

## Style Checks

- [ ] Line weight and rendering density are stable across pages.
- [ ] Character proportions match the selected style.
- [ ] Tone/color choices support readability.
- [ ] Every page follows the locked black-and-white/color mode.
- [ ] Background detail is consistent with the scene priority.
- [ ] The result reads as the selected manga/comic tradition, not generic illustration.
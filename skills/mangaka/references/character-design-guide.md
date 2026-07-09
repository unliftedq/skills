# Manga Character Design Guide

Use this reference after the treatment and script identify recurring characters. Character sheets lock model consistency across pages.

## Outputs

- Generate or request one sheet per recurring character into `characters/<name>.png`.
- Write `characters/character-bible.md` with concise on-model notes.
- In review-per-step mode, get user approval before page production.
- In fully automated mode, treat generated sheets as locked after verifying they exist on disk.

## Required Sheet Views

Every recurring character sheet should include:

- front view
- 3/4 front view
- side/profile view
- 3/4 back view
- back view
- head turns
- expression sheet
- key action poses
- outfit/accessory/prop breakdown

Keep all views at consistent scale and proportion. Use a plain background so the design reads clearly.

## Manga-Specific Model Notes

For every character, record:

- role, age range, and body type
- silhouette and head/body proportion
- hair shape, eye shape, face shape, and defining marks
- clothing layers, accessories, and recurring props
- tone/color palette
- facial acting range
- signature gesture or posture
- details that must never drift

Inject these notes into every page prompt where the character appears.

## Cast Lineup

For casts with more than two recurring characters, create or request `characters/lineup.png` showing the main cast together at correct relative scale. Use it as a reference image in crowd, group, and cover prompts.

## Prompt Packet Requirements

Character prompt packets should specify:

- the locked art-style bible
- the character description and silhouette
- required turnaround views
- expressions and action poses
- outfit and prop breakdown
- consistent proportions across all views
- plain background and target size

## Approval Checks

- [ ] Required views are present and aligned.
- [ ] Proportions match across views.
- [ ] Hair, eyes, outfit, and props are consistent.
- [ ] Expressions fit the story's emotional range.
- [ ] Action poses cover the script's recurring actions.
- [ ] Written bible notes exist for prompt reuse.
#!/usr/bin/env node
'use strict';

// Validate basic manga package structure before delivery.
// Checks numbered page images, optional cover, and saved prompt packets.

const fs = require('fs');
const path = require('path');

const NUMBERED_IMAGE_RE = /^(\d+)\.(png|jpe?g|webp)$/i;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root' || arg === '--pages' || arg === '--prompts' || arg === '--cover') {
      args[arg.slice(2)] = argv[++i];
    } else if (arg === '--require-cover' || arg === '--allow-missing-prompts' || arg === '--require-docs') {
      args[arg.slice(2)] = true;
    } else if (!arg.startsWith('-')) {
      args._.push(arg);
    }
  }
  return args;
}

function usage() {
  console.error('Usage:');
  console.error('  node validate-manga-package.cjs --root <manga-project-dir> [--require-docs] [--require-cover]');
  console.error('  node validate-manga-package.cjs --pages <manga-dir> --prompts <prompts/pages-dir> [--cover <cover.png>]');
}

// Story-plan documents expected in a full manga project, relative to --root.
const STORY_DOCS = [
  'treatment.md',
  'script.md',
  path.join('name', 'storyboard.md'),
  path.join('characters', 'character-bible.md'),
];

function collectNumberedImages(dir) {
  if (!fs.existsSync(dir)) throw new Error('Pages directory not found: ' + dir);
  return fs.readdirSync(dir)
    .filter((file) => NUMBERED_IMAGE_RE.test(file))
    .map((file) => {
      const match = file.match(NUMBERED_IMAGE_RE);
      return {
        index: parseInt(match[1], 10),
        filename: file,
        path: path.join(dir, file),
      };
    })
    .sort((a, b) => a.index - b.index);
}

function extractFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  return { yaml: match[1], body: match[2] };
}

function hasRefDescriptions(body, count) {
  for (let i = 0; i < count; i++) {
    const escaped = String(i).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\[${escaped}\\]`);
    if (!re.test(body)) return false;
  }
  return true;
}

function listRefs(yaml) {
  const refMatch = yaml.match(/(?:^|\n)ref:\s*\n([\s\S]*?)(?:\n\S|$)/);
  if (!refMatch) return [];
  return refMatch[1].split(/\r?\n/)
    .map((line) => line.match(/^\s*-\s+(.+?)\s*$/))
    .filter(Boolean)
    .map((match) => match[1].replace(/^['"]|['"]$/g, ''));
}

function validatePrompt(promptFile, errors) {
  if (!fs.existsSync(promptFile)) {
    errors.push(`Missing prompt: ${promptFile}`);
    return;
  }
  const parsed = extractFrontmatter(fs.readFileSync(promptFile, 'utf8'));
  if (!parsed) {
    errors.push(`Prompt missing YAML frontmatter: ${promptFile}`);
    return;
  }
  if (!/(?:^|\n)size:\s*\S+/.test(parsed.yaml)) errors.push(`Prompt missing size: ${promptFile}`);
  if (!/(?:^|\n)ref:\s*\n/.test(parsed.yaml)) errors.push(`Prompt missing ref list: ${promptFile}`);
  if (!parsed.body.trim()) errors.push(`Prompt body is empty: ${promptFile}`);
  const refs = listRefs(parsed.yaml);
  const refCount = refs.length;
  if (!hasRefDescriptions(parsed.body, refCount)) {
    errors.push(`Prompt does not describe every ref with zero-based indexes: ${promptFile}`);
  }
  for (const ref of refs) {
    const resolved = path.resolve(path.dirname(promptFile), ref);
    if (!fs.existsSync(resolved)) errors.push(`Prompt ref does not exist: ${promptFile} -> ${ref}`);
  }
}

function main() {
  try {
    const args = parseArgs(process.argv);
    const root = args.root || args._[0];
    const rootDir = root ? path.resolve(String(root)) : null;
    const pagesDir = path.resolve(String(args.pages || (rootDir && path.join(rootDir, 'manga')) || ''));
    const promptsDir = path.resolve(String(args.prompts || (rootDir && path.join(rootDir, 'prompts', 'pages')) || ''));
    const cover = args.cover || (rootDir && path.join(rootDir, 'cover.png'));

    if (!pagesDir || !promptsDir) {
      usage();
      process.exit(1);
    }

    const errors = [];
    const warnings = [];
    const pages = collectNumberedImages(pagesDir);
    if (!pages.length) errors.push('No numbered page images found. Expected 1.png, 2.png, ...');

    for (let i = 0; i < pages.length; i++) {
      const expected = i + 1;
      if (pages[i].index !== expected) {
        errors.push(`Missing or misnumbered page. Expected ${expected}, found ${pages[i].filename}`);
      }
    }

    if (!args['allow-missing-prompts']) {
      for (const page of pages) validatePrompt(path.join(promptsDir, `${page.index}.md`), errors);
      const coverPrompt = rootDir && path.join(rootDir, 'prompts', 'cover.md');
      if (coverPrompt && fs.existsSync(coverPrompt)) validatePrompt(coverPrompt, errors);
    }

    if (rootDir) {
      for (const doc of STORY_DOCS) {
        const docPath = path.join(rootDir, doc);
        if (!fs.existsSync(docPath)) {
          const message = `Missing story document: ${doc}`;
          if (args['require-docs']) errors.push(message);
          else warnings.push(message);
        }
      }
    }

    if (args['require-cover'] && (!cover || !fs.existsSync(cover))) errors.push('Required cover not found');

    const result = {
      ok: errors.length === 0,
      pages: pages.length,
      pagesDir,
      promptsDir,
      cover: cover ? fs.existsSync(cover) : false,
      warnings,
      errors,
    };

    for (const warning of warnings) console.error(`warning: ${warning}`);

    if (errors.length) {
      for (const error of errors) console.error(error);
      console.log(JSON.stringify(result));
      process.exit(1);
    }

    console.error(`Validated ${pages.length} page(s)`);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
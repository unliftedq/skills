#!/usr/bin/env node
'use strict';

// Package a manga cover and numbered page images into a CBZ archive.
// Writes a ComicInfo.xml so readers honor title, page count, and reading direction.
// Uses only Node.js built-ins.
//   node package-cbz.cjs --cover ./cover.png --pages ./manga --output ./one-shot.cbz
//   node package-cbz.cjs ./manga --output ./one-shot.cbz --manga rtl --title "My One-Shot"

const fs = require('fs');
const path = require('path');
const { ZipWriter } = require('./lib/zip.cjs');

const NUMBERED_IMAGE_RE = /^(\d+)\.(png|jpe?g|webp)$/i;

// Map reading-direction input to the ComicInfo.xml <Manga> enum.
// YesAndRightToLeft = Japanese manga RTL; No = western LTR comic; Yes = manga, direction unspecified.
const MANGA_VALUES = {
  rtl: 'YesAndRightToLeft',
  'right-to-left': 'YesAndRightToLeft',
  yes: 'Yes',
  ltr: 'No',
  'left-to-right': 'No',
  no: 'No',
  unknown: 'Unknown',
};

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--output') {
      args.output = argv[++i];
    } else if (arg === '--cover' || arg === '--pages' || arg === '--dir' || arg === '--manga' || arg === '--title') {
      args[arg.slice(2)] = argv[++i];
    } else if (arg === '--no-comicinfo') {
      args['no-comicinfo'] = true;
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) { args[key] = next; i++; }
      else args[key] = true;
    } else if (!arg.startsWith('-')) {
      args._.push(arg);
    }
  }
  return args;
}

function usage() {
  console.error('Usage:');
  console.error('  node package-cbz.cjs --cover <cover.png> --pages <manga-dir> --output <manga.cbz> [--manga rtl|ltr|yes|no] [--title <title>]');
  console.error('  node package-cbz.cjs <numbered-image-dir> [--output <manga.cbz>] [--manga rtl|ltr|yes|no] [--title <title>]');
}

function imageEntry(filePath, index) {
  return {
    filename: path.basename(filePath),
    path: filePath,
    index,
  };
}

function collectNumberedImages(dir) {
  if (!fs.existsSync(dir)) throw new Error('Pages directory not found: ' + dir);
  return fs.readdirSync(dir)
    .filter((file) => NUMBERED_IMAGE_RE.test(file))
    .map((file) => {
      const match = file.match(NUMBERED_IMAGE_RE);
      return imageEntry(path.join(dir, file), parseInt(match[1], 10));
    })
    .sort((a, b) => a.index - b.index);
}

function assertNoGaps(images) {
  for (let i = 0; i < images.length; i++) {
    const expected = i + 1;
    if (images[i].index !== expected) {
      throw new Error(`Missing or misnumbered page. Expected ${expected}, found ${images[i].filename}`);
    }
  }
}

function collectImages(args) {
  const pagesDir = args.pages || args.dir || args._[0];
  if (!pagesDir) {
    usage();
    process.exit(1);
  }

  const pages = collectNumberedImages(path.resolve(String(pagesDir)));
  if (!pages.length) throw new Error('No numbered page images found. Expected 1.png, 2.png, ...');
  assertNoGaps(pages);

  const images = [];
  if (args.cover) {
    const cover = path.resolve(String(args.cover));
    if (!fs.existsSync(cover)) throw new Error('Cover not found: ' + cover);
    images.push(imageEntry(cover, 0));
  }
  images.push(...pages);
  return images;
}

function defaultOutput(args) {
  if (args.output) return path.resolve(String(args.output));
  const dir = path.resolve(String(args.pages || args.dir || args._[0]));
  return path.join(path.dirname(dir), `${path.basename(dir)}.cbz`);
}

function archiveName(image, ordinal) {
  const ext = path.extname(image.filename).toLowerCase();
  if (image.index === 0) return `000-cover${ext}`;
  return `${String(ordinal).padStart(3, '0')}${ext}`;
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveManga(args) {
  const raw = args.manga === undefined ? 'rtl' : String(args.manga).toLowerCase();
  const value = MANGA_VALUES[raw];
  if (!value) {
    throw new Error(`Invalid --manga value: ${args.manga}. Use one of: rtl, ltr, yes, no, unknown.`);
  }
  return value;
}

function buildComicInfo(args, pageCount) {
  const manga = resolveManga(args);
  const title = args.title ? String(args.title) : path.basename(defaultOutput(args), '.cbz');
  return `<?xml version="1.0" encoding="utf-8"?>
<ComicInfo xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Title>${xmlEscape(title)}</Title>
  <PageCount>${pageCount}</PageCount>
  <Manga>${manga}</Manga>
</ComicInfo>
`;
}

function main() {
  try {
    const args = parseArgs(process.argv);
    const images = collectImages(args);
    const output = defaultOutput(args);
    const zip = new ZipWriter();
    let pageOrdinal = 1;

    for (const image of images) {
      const name = archiveName(image, image.index === 0 ? 0 : pageOrdinal++);
      zip.add(name, fs.readFileSync(image.path), false);
      console.error(`Added: ${name} <= ${image.filename}`);
    }

    const pageCount = pageOrdinal - 1;
    let comicInfo = false;
    if (!args['no-comicinfo']) {
      zip.add('ComicInfo.xml', buildComicInfo(args, pageCount), true);
      comicInfo = true;
      console.error('Added: ComicInfo.xml');
    }

    fs.writeFileSync(output, zip.build());
    console.error(`Wrote ${images.length} image(s) to ${output}`);
    console.log(JSON.stringify({
      output,
      images: images.length,
      pages: pageCount,
      cover: Boolean(args.cover),
      comicInfo,
      manga: comicInfo ? resolveManga(args) : null,
    }));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
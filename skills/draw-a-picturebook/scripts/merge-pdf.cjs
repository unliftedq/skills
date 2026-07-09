#!/usr/bin/env node
'use strict';

// Merge generated images into a single PDF.
// Supports picturebook input (--cover/--pages) and numbered directory input:
//   node merge-pdf.cjs --cover ./cover.png --pages ./picturebook --output ./book.pdf
//   node merge-pdf.cjs ./picturebook --output ./book.pdf

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getImageInfo, decodePngToRgb } = require('./lib/image.cjs');

const NUMBERED_IMAGE_RE = /^(\d+)\.(png|jpe?g)$/i;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--output') {
      args.output = argv[++i];
    } else if (arg === '--cover' || arg === '--pages' || arg === '--dir') {
      args[arg.slice(2)] = argv[++i];
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
  console.error('  node merge-pdf.cjs --cover <cover.png> --pages <picturebook-dir> --output <book.pdf>');
  console.error('  node merge-pdf.cjs <numbered-image-dir> [--output <book.pdf>]');
}

function imageEntry(filePath, index) {
  return {
    filename: path.basename(filePath),
    path: filePath,
    index,
  };
}

function collectNumberedImages(dir) {
  return fs.readdirSync(dir)
    .filter((file) => NUMBERED_IMAGE_RE.test(file))
    .map((file) => {
      const match = file.match(NUMBERED_IMAGE_RE);
      return imageEntry(path.join(dir, file), parseInt(match[1], 10));
    })
    .sort((a, b) => a.index - b.index);
}

function collectPicturebookImages(args) {
  const images = [];
  if (args.cover) {
    const cover = path.resolve(String(args.cover));
    if (!fs.existsSync(cover)) throw new Error('Cover not found: ' + cover);
    images.push(imageEntry(cover, 0));
  }
  if (args.pages) {
    const dir = path.resolve(String(args.pages));
    if (!fs.existsSync(dir)) throw new Error('Pages directory not found: ' + dir);
    images.push(...collectNumberedImages(dir));
  }
  return images;
}

function collectDirectoryImages(dir) {
  if (!fs.existsSync(dir)) throw new Error('Directory not found: ' + dir);
  return collectNumberedImages(dir);
}

function collectImages(args) {
  if (args.cover || args.pages) return collectPicturebookImages(args);

  const dir = args.dir || args._[0];
  if (!dir) {
    usage();
    process.exit(1);
  }
  return collectDirectoryImages(path.resolve(String(dir)));
}

function defaultOutput(args, extension) {
  if (args.output) return path.resolve(String(args.output));
  const dir = args.cover || args.pages ? undefined : path.resolve(String(args.dir || args._[0]));
  if (!dir) return path.resolve(`picturebook.${extension}`);
  return path.join(dir, `${path.basename(dir)}.${extension}`);
}

function buildPdf(images) {
  const objs = [];
  const reserve = () => { objs.push(null); return objs.length; };
  const set = (n, buf) => { objs[n - 1] = Buffer.isBuffer(buf) ? buf : Buffer.from(buf, 'latin1'); };

  const catalogN = reserve();
  const pagesN = reserve();
  const kids = [];

  for (const image of images) {
    const buf = fs.readFileSync(image.path);
    const info = getImageInfo(buf);
    const w = info.width;
    const h = info.height;

    const imageN = reserve();
    const contentN = reserve();
    const pageN = reserve();
    kids.push(pageN);

    let dict;
    let data;
    if (info.type === 'jpg') {
      const cs = info.components === 1 ? '/DeviceGray' : '/DeviceRGB';
      dict = `<< /Type /XObject /Subtype /Image /Width ${info.width} /Height ${info.height} ` +
             `/ColorSpace ${cs} /BitsPerComponent 8 /Filter /DCTDecode /Length ${buf.length} >>`;
      data = buf;
    } else {
      const decoded = decodePngToRgb(buf);
      const comp = zlib.deflateSync(decoded.rgb);
      dict = `<< /Type /XObject /Subtype /Image /Width ${decoded.width} /Height ${decoded.height} ` +
             `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${comp.length} >>`;
      data = comp;
    }

    set(imageN, Buffer.concat([
      Buffer.from(`${imageN} 0 obj\n${dict}\nstream\n`, 'latin1'),
      data,
      Buffer.from('\nendstream\nendobj\n', 'latin1'),
    ]));

    const content = `q\n${w} 0 0 ${h} 0 0 cm\n/Im0 Do\nQ\n`;
    set(contentN, `${contentN} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
    set(pageN, `${pageN} 0 obj\n<< /Type /Page /Parent ${pagesN} 0 R /MediaBox [0 0 ${w} ${h}] ` +
      `/Resources << /XObject << /Im0 ${imageN} 0 R >> >> /Contents ${contentN} 0 R >>\nendobj\n`);

    console.error(`Added: ${image.filename}`);
  }

  set(pagesN, `${pagesN} 0 obj\n<< /Type /Pages /Kids [${kids.map((k) => k + ' 0 R').join(' ')}] ` +
    `/Count ${kids.length} >>\nendobj\n`);
  set(catalogN, `${catalogN} 0 obj\n<< /Type /Catalog /Pages ${pagesN} 0 R >>\nendobj\n`);

  const header = Buffer.from('%PDF-1.5\n%\xe2\xe3\xcf\xd3\n', 'latin1');
  const parts = [header];
  const offsets = [];
  let pos = header.length;
  for (let i = 0; i < objs.length; i++) {
    offsets[i] = pos;
    parts.push(objs[i]);
    pos += objs[i].length;
  }
  const xrefPos = pos;
  let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < objs.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  const trailer = `trailer\n<< /Size ${objs.length + 1} /Root ${catalogN} 0 R >>\n` +
    `startxref\n${xrefPos}\n%%EOF\n`;
  parts.push(Buffer.from(xref + trailer, 'latin1'));
  return Buffer.concat(parts);
}

function main() {
  const args = parseArgs(process.argv);
  const images = collectImages(args);
  if (!images.length) {
    console.error('No images found. Expected numbered files such as 1.png, 2.png, ...');
    process.exit(1);
  }

  const output = defaultOutput(args, 'pdf');
  const pdf = buildPdf(images);
  fs.writeFileSync(output, pdf);
  console.error(`Wrote ${images.length} page(s) to ${output}`);
  console.log(JSON.stringify({ output, pages: images.length }));
}

main();

#!/usr/bin/env node
'use strict';

// Merge generated images into a PowerPoint .pptx.
// Supports picturebook input (--cover/--pages) and numbered directory input:
//   node merge-slides.cjs --cover ./cover.png --pages ./picturebook --output ./book.pptx
//   node merge-slides.cjs ./picturebook --output ./book.pptx

const fs = require('fs');
const path = require('path');
const { ZipWriter } = require('./lib/zip.cjs');
const { getImageInfo } = require('./lib/image.cjs');

const NUMBERED_IMAGE_RE = /^(\d+)\.(png|jpe?g)$/i;
const MAX_EMU = 9144000;

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
  console.error('  node merge-slides.cjs --cover <cover.png> --pages <picturebook-dir> --output <book.pptx>');
  console.error('  node merge-slides.cjs <numbered-image-dir> [--output <book.pptx>]');
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

const THEME = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`;

const EMPTY_SPTREE = '<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree>';

function slideMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld>${EMPTY_SPTREE}</p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>`;
}

function slideLayoutXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank">${EMPTY_SPTREE}</p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
}

function slideXml(rid, off, ext) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:pic><p:nvPicPr><p:cNvPr id="2" name="Picture"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${off.x}" y="${off.y}"/><a:ext cx="${ext.cx}" cy="${ext.cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
}

function addStaticParts(zip, slideCx, slideCy, slideCount) {
  let contentOverrides = '';
  let sldIds = '';
  let presRels = '';

  for (let i = 0; i < slideCount; i++) {
    contentOverrides += `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`;
    sldIds += `<p:sldId id="${256 + i}" r:id="rSld${i + 1}"/>`;
    presRels += `<Relationship Id="rSld${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`;
  }

  zip.add('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>${contentOverrides}</Types>`);

  zip.add('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`);

  zip.add('ppt/presentation.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rIdSm"/></p:sldMasterIdLst><p:sldIdLst>${sldIds}</p:sldIdLst><p:sldSz cx="${slideCx}" cy="${slideCy}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`);

  zip.add('ppt/_rels/presentation.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdSm" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/><Relationship Id="rIdTheme" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>${presRels}</Relationships>`);

  zip.add('ppt/slideMasters/slideMaster1.xml', slideMasterXml());
  zip.add('ppt/slideMasters/_rels/slideMaster1.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`);
  zip.add('ppt/slideLayouts/slideLayout1.xml', slideLayoutXml());
  zip.add('ppt/slideLayouts/_rels/slideLayout1.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`);
  zip.add('ppt/theme/theme1.xml', THEME);

}

function build(images) {
  const zip = new ZipWriter();

  const first = getImageInfo(fs.readFileSync(images[0].path));
  let slideCx;
  let slideCy;
  if (first.width >= first.height) {
    slideCx = MAX_EMU;
    slideCy = Math.round(MAX_EMU * first.height / first.width);
  } else {
    slideCy = MAX_EMU;
    slideCx = Math.round(MAX_EMU * first.width / first.height);
  }
  const slideAspect = slideCx / slideCy;

  addStaticParts(zip, slideCx, slideCy, images.length);

  const media = images.map((image, i) => {
    const buf = fs.readFileSync(image.path);
    const info = getImageInfo(buf);
    const ext = info.type === 'png' ? 'png' : 'jpg';
    zip.add(`ppt/media/image${i + 1}.${ext}`, buf, false);
    return { ext, info };
  });

  for (let i = 0; i < images.length; i++) {
    const info = media[i].info;
    const imgAspect = info.width / info.height;
    let cx;
    let cy;
    let x;
    let y;
    if (imgAspect > slideAspect) {
      cx = slideCx;
      cy = Math.round(slideCx / imgAspect);
      x = 0;
      y = Math.round((slideCy - cy) / 2);
    } else {
      cy = slideCy;
      cx = Math.round(slideCy * imgAspect);
      y = 0;
      x = Math.round((slideCx - cx) / 2);
    }

    zip.add(`ppt/slides/slide${i + 1}.xml`, slideXml('rId1', { x, y }, { cx, cy }));
    zip.add(`ppt/slides/_rels/slide${i + 1}.xml.rels`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image${i + 1}.${media[i].ext}"/></Relationships>`);

    console.error(`Added: ${images[i].filename}`);
  }

  return zip;
}

function main() {
  const args = parseArgs(process.argv);
  const images = collectImages(args);
  if (!images.length) {
    console.error('No images found. Expected numbered files such as 1.png, 2.png, ...');
    process.exit(1);
  }

  const output = defaultOutput(args, 'pptx');
  const zip = build(images);
  fs.writeFileSync(output, zip.build());
  console.error(`Wrote ${images.length} slide(s) to ${output}`);
  console.log(JSON.stringify({ output, slides: images.length }));
}

main();

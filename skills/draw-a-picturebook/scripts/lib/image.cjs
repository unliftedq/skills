'use strict';

// Minimal PNG/JPEG utilities using only Node.js built-ins.
// - getImageInfo: read type + dimensions
// - decodePngToRgb: decode an 8-bit PNG to raw RGB (alpha composited over white)

const zlib = require('zlib');

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function getJpegInfo(buf) {
  let off = 2;
  while (off < buf.length) {
    if (buf[off] !== 0xff) { off++; continue; }
    const marker = buf[off + 1];
    off += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 ||
        (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (off + 2 > buf.length) break;
    const len = buf.readUInt16BE(off);
    // SOF0..SOF15 (except DHT 0xC4, JPG 0xC8, DAC 0xCC) carry frame dimensions
    if (marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = buf.readUInt16BE(off + 3);
      const width = buf.readUInt16BE(off + 5);
      const components = buf[off + 7];
      return { width, height, components };
    }
    off += len;
  }
  return null;
}

function getImageInfo(buf) {
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50 &&
      buf[2] === 0x4e && buf[3] === 0x47) {
    return { type: 'png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    const size = getJpegInfo(buf);
    if (size) {
      return { type: 'jpg', width: size.width, height: size.height, components: size.components };
    }
  }
  throw new Error('Unsupported image format (only PNG and JPEG are supported)');
}

function decodePngToRgb(buf) {
  let off = 8; // skip 8-byte signature
  let width, height, bitDepth, colorType, interlace;
  let palette = null;
  let trns = null;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off); off += 4;
    const type = buf.toString('ascii', off, off + 4); off += 4;
    const data = buf.slice(off, off + len); off += len; off += 4; // skip CRC
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'PLTE') palette = data;
    else if (type === 'tRNS') trns = data;
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
  }
  if (bitDepth !== 8) throw new Error('Unsupported PNG bit depth: ' + bitDepth + ' (only 8-bit is supported)');
  if (interlace !== 0) throw new Error('Interlaced PNG is not supported');

  const channelsByType = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
  const ch = channelsByType[colorType];
  if (!ch) throw new Error('Unsupported PNG color type: ' + colorType);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * ch;
  const px = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const rowStart = y * stride;
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[pos++];
      const a = x >= ch ? px[rowStart + x - ch] : 0;
      const b = y > 0 ? px[rowStart - stride + x] : 0;
      const c = (x >= ch && y > 0) ? px[rowStart - stride + x - ch] : 0;
      let val;
      switch (filter) {
        case 0: val = rawByte; break;
        case 1: val = rawByte + a; break;
        case 2: val = rawByte + b; break;
        case 3: val = rawByte + ((a + b) >> 1); break;
        case 4: val = rawByte + paeth(a, b, c); break;
        default: throw new Error('Unsupported PNG filter type: ' + filter);
      }
      px[rowStart + x] = val & 0xff;
    }
  }

  const rgb = Buffer.alloc(width * height * 3);
  let o = 0;
  for (let i = 0; i < width * height; i++) {
    const base = i * ch;
    let r, g, bl, alpha = 255;
    if (colorType === 0) { r = g = bl = px[base]; }
    else if (colorType === 2) { r = px[base]; g = px[base + 1]; bl = px[base + 2]; }
    else if (colorType === 3) {
      const idx = px[base];
      r = palette[idx * 3]; g = palette[idx * 3 + 1]; bl = palette[idx * 3 + 2];
      if (trns && idx < trns.length) alpha = trns[idx];
    } else if (colorType === 4) { r = g = bl = px[base]; alpha = px[base + 1]; }
    else if (colorType === 6) { r = px[base]; g = px[base + 1]; bl = px[base + 2]; alpha = px[base + 3]; }
    if (alpha !== 255) {
      const af = alpha / 255;
      r = Math.round(r * af + 255 * (1 - af));
      g = Math.round(g * af + 255 * (1 - af));
      bl = Math.round(bl * af + 255 * (1 - af));
    }
    rgb[o++] = r; rgb[o++] = g; rgb[o++] = bl;
  }
  return { width, height, rgb };
}

module.exports = { getImageInfo, decodePngToRgb };

'use strict';

// Minimal ZIP writer (store + deflate) using only Node.js built-ins.
// Enough to assemble OOXML .pptx packages and CBZ archives.

const zlib = require('zlib');

let crcTable = null;
function buildCrcTable() {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  return table;
}
function crc32(buf) {
  if (!crcTable) crcTable = buildCrcTable();
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

class ZipWriter {
  constructor() { this.entries = []; }

  add(name, content, compress = true) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
    let stored = data;
    let method = 0;
    if (compress) {
      const def = zlib.deflateRawSync(data);
      if (def.length < data.length) { stored = def; method = 8; }
    }
    this.entries.push({ name, data, stored, crc: crc32(data), method });
  }

  build() {
    const chunks = [];
    const central = [];
    let offset = 0;
    for (const e of this.entries) {
      const nameBuf = Buffer.from(e.name, 'utf8');
      const local = Buffer.alloc(30);
      local.writeUInt32LE(0x04034b50, 0);
      local.writeUInt16LE(20, 4);   // version needed
      local.writeUInt16LE(0, 6);    // flags
      local.writeUInt16LE(e.method, 8);
      local.writeUInt16LE(0, 10);   // mod time
      local.writeUInt16LE(0, 12);   // mod date
      local.writeUInt32LE(e.crc, 14);
      local.writeUInt32LE(e.stored.length, 18);
      local.writeUInt32LE(e.data.length, 22);
      local.writeUInt16LE(nameBuf.length, 26);
      local.writeUInt16LE(0, 28);   // extra len
      chunks.push(local, nameBuf, e.stored);

      const cd = Buffer.alloc(46);
      cd.writeUInt32LE(0x02014b50, 0);
      cd.writeUInt16LE(20, 4);      // version made by
      cd.writeUInt16LE(20, 6);      // version needed
      cd.writeUInt16LE(0, 8);       // flags
      cd.writeUInt16LE(e.method, 10);
      cd.writeUInt16LE(0, 12);
      cd.writeUInt16LE(0, 14);
      cd.writeUInt32LE(e.crc, 16);
      cd.writeUInt32LE(e.stored.length, 20);
      cd.writeUInt32LE(e.data.length, 24);
      cd.writeUInt16LE(nameBuf.length, 28);
      cd.writeUInt16LE(0, 30);      // extra len
      cd.writeUInt16LE(0, 32);      // comment len
      cd.writeUInt16LE(0, 34);      // disk number
      cd.writeUInt16LE(0, 36);      // internal attrs
      cd.writeUInt32LE(0, 38);      // external attrs
      cd.writeUInt32LE(offset, 42);
      central.push(Buffer.concat([cd, nameBuf]));

      offset += local.length + nameBuf.length + e.stored.length;
    }

    const centralBuf = Buffer.concat(central);
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(0, 4);
    eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(this.entries.length, 8);
    eocd.writeUInt16LE(this.entries.length, 10);
    eocd.writeUInt32LE(centralBuf.length, 12);
    eocd.writeUInt32LE(offset, 16);
    eocd.writeUInt16LE(0, 20);

    return Buffer.concat([...chunks, centralBuf, eocd]);
  }
}

module.exports = { ZipWriter, crc32 };

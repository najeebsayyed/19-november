import fs from 'fs';
import zlib from 'zlib';

// Function to generate a simple valid 32x32 PNG of the cricket ball icon
function createFaviconPng() {
  const width = 32;
  const height = 32;

  // Uncompressed raw image data: each row starts with filter byte 0, followed by RGBA
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  const cx = 15.5;
  const cy = 15.5;
  const radius = 14;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter byte 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // Outer dark ring
        if (dist > radius - 1.5) {
          rawData[pixelOffset] = 56;     // R (sky-400 border)
          rawData[pixelOffset + 1] = 189; // G
          rawData[pixelOffset + 2] = 248; // B
          rawData[pixelOffset + 3] = 255; // A
        } else {
          // Inside ball (red gradient)
          const grad = Math.max(0, 1 - dist / radius);
          const r = Math.min(255, Math.floor(220 + 35 * grad));
          const g = Math.floor(38 * grad);
          const b = Math.floor(38 * grad);

          // Heartbreak seam line down the middle
          const isSeam = Math.abs(dx - Math.sin(dy * 0.4) * 2) < 1.2;
          // Cricket blue tear in upper right quadrant
          const isTear = (dx > 4 && dx < 10 && dy > -8 && dy < 0);

          if (isTear) {
            rawData[pixelOffset] = 56;
            rawData[pixelOffset + 1] = 189;
            rawData[pixelOffset + 2] = 248;
            rawData[pixelOffset + 3] = 255;
          } else if (isSeam) {
            rawData[pixelOffset] = 255;
            rawData[pixelOffset + 1] = 255;
            rawData[pixelOffset + 2] = 255;
            rawData[pixelOffset + 3] = 255;
          } else {
            rawData[pixelOffset] = r;
            rawData[pixelOffset + 1] = g;
            rawData[pixelOffset + 2] = b;
            rawData[pixelOffset + 3] = 255;
          }
        }
      } else {
        // Transparent
        rawData[pixelOffset] = 0;
        rawData[pixelOffset + 1] = 0;
        rawData[pixelOffset + 2] = 0;
        rawData[pixelOffset + 3] = 0;
      }
    }
  }

  // Compress with deflate
  const compressedData = zlib.deflateSync(rawData);

  // Helper to calculate CRC32
  function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
      }
    }
    return ~c >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);

    const combined = Buffer.concat([typeBuf, data]);
    const crc = crc32(combined);
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([len, combined, crcBuf]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression method: 0
  ihdr[11] = 0; // Filter method: 0
  ihdr[12] = 0; // Interlace method: 0

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createFaviconPng();
fs.writeFileSync('public/favicon.png', pngBuffer);

// Now wrap PNG into standard ICO container
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = Icon
icoHeader.writeUInt16LE(1, 4); // 1 image

const icoEntry = Buffer.alloc(16);
icoEntry[0] = 32; // Width 32
icoEntry[1] = 32; // Height 32
icoEntry[2] = 0;  // Color palette 0 (no palette)
icoEntry[3] = 0;  // Reserved
icoEntry.writeUInt16LE(1, 4);  // Color planes
icoEntry.writeUInt16LE(32, 6); // Bits per pixel
icoEntry.writeUInt32LE(pngBuffer.length, 8);  // Image data size
icoEntry.writeUInt32LE(6 + 16, 12);           // Offset where PNG starts

const icoFile = Buffer.concat([icoHeader, icoEntry, pngBuffer]);
fs.writeFileSync('public/favicon.ico', icoFile);

console.log('Successfully generated public/favicon.png and public/favicon.ico!');

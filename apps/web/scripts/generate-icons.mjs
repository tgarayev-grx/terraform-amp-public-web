#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SIZES = {
  appleTouchIcon: 180,
  androidSmall: 192,
  androidLarge: 512,
  faviconLarge: 32,
  faviconSmall: 16,
};

const OUTPUT_DIR = resolve(__dirname, "../public");
const APP_DIR = resolve(__dirname, "../src/app");

function getPNGDimensions(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") {
    throw new Error("Not a valid PNG file");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function createICO(png32Buffer, png16Buffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(2, 4);

  const dir32 = Buffer.alloc(16);
  dir32.writeUInt8(32, 0);
  dir32.writeUInt8(32, 1);
  dir32.writeUInt8(0, 2);
  dir32.writeUInt8(0, 3);
  dir32.writeUInt16LE(1, 4);
  dir32.writeUInt16LE(32, 6);
  dir32.writeUInt32LE(png32Buffer.length, 8);
  dir32.writeUInt32LE(22, 12);

  const dir16 = Buffer.alloc(16);
  dir16.writeUInt8(16, 0);
  dir16.writeUInt8(16, 1);
  dir16.writeUInt8(0, 2);
  dir16.writeUInt8(0, 3);
  dir16.writeUInt16LE(1, 4);
  dir16.writeUInt16LE(32, 6);
  dir16.writeUInt32LE(png16Buffer.length, 8);
  dir16.writeUInt32LE(22 + png32Buffer.length, 12);

  return Buffer.concat([header, dir32, dir16, png32Buffer, png16Buffer]);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Error: Please provide the source image path");
    console.log("Usage: node scripts/generate-icons.mjs <source-image-path>");
    process.exit(1);
  }

  const sourcePath = resolve(args[0]);

  if (!existsSync(sourcePath)) {
    console.error(`Error: Source image not found: ${sourcePath}`);
    process.exit(1);
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const sourceBuffer = readFileSync(sourcePath);
  const { width, height } = getPNGDimensions(sourceBuffer);

  if (width !== height) {
    console.warn(
      "Warning: Source image is not square. Results may be distorted."
    );
  }

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (error) {
    console.error("sharp library required. Run: pnpm add -D sharp");
    process.exit(1);
  }

  const tasks = [
    {
      name: "Apple Touch Icon",
      size: SIZES.appleTouchIcon,
      output: join(APP_DIR, "apple-icon.png"),
    },
    {
      name: "Android Small",
      size: SIZES.androidSmall,
      output: join(OUTPUT_DIR, "icon-192.png"),
    },
    {
      name: "Android Large",
      size: SIZES.androidLarge,
      output: join(OUTPUT_DIR, "icon-512.png"),
    },
  ];

  for (const task of tasks) {
    const outputBuffer = await sharp(sourceBuffer)
      .resize(task.size, task.size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    writeFileSync(task.output, outputBuffer);
    console.log(`Generated ${task.name}: ${task.output}`);
  }

  const png32 = await sharp(sourceBuffer)
    .resize(SIZES.faviconLarge, SIZES.faviconLarge, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const png16 = await sharp(sourceBuffer)
    .resize(SIZES.faviconSmall, SIZES.faviconSmall, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const icoPath = join(APP_DIR, "favicon.ico");
  writeFileSync(icoPath, createICO(png32, png16));
  console.log(`Generated Favicon: ${icoPath}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

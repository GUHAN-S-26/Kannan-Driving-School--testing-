import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'd:\\Car Driving School\\logo1.png';
const outputPath = 'd:\\Car Driving School\\logo1-transparent.png';

async function removeBackground() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const output = Buffer.from(data);
  const visited = new Uint8Array(width * height);
  const isBackground = new Uint8Array(width * height);

  function getPixelIdx(x, y) {
    return (y * width + x) * channels;
  }

  // More aggressive: consider anything with R,G,B all above 200 AND
  // where the variance between R,G,B is small (grayish/whitish) as background
  function isBackgroundPixel(x, y) {
    const idx = getPixelIdx(x, y);
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const avg = (r + g + b) / 3;
    const variance = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    // White/light gray background: high brightness, low color variance
    return avg > 200 && variance < 30;
  }

  // BFS from all edges
  const queue = [];
  for (let x = 0; x < width; x++) {
    if (isBackgroundPixel(x, 0)) { queue.push([x, 0]); visited[x] = 1; }
    if (isBackgroundPixel(x, height - 1)) { queue.push([x, height - 1]); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBackgroundPixel(0, y)) { queue.push([0, y]); visited[y * width] = 1; }
    if (isBackgroundPixel(width - 1, y)) { queue.push([width - 1, y]); visited[y * width + (width - 1)] = 1; }
  }

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    isBackground[y * width + x] = 1;

    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny * width + nx]) {
        visited[ny * width + nx] = 1;
        if (isBackgroundPixel(nx, ny)) {
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Apply transparency and smooth anti-aliased edges
  let removedCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelLinear = y * width + x;
      if (isBackground[pixelLinear]) {
        const idx = getPixelIdx(x, y);
        output[idx + 3] = 0;
        removedCount++;
      } else {
        // Check if near the edge of foreground — apply alpha feathering
        let nearBackground = false;
        for (const [dx, dy] of directions) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && isBackground[ny * width + nx]) {
            nearBackground = true;
            break;
          }
        }
        if (nearBackground) {
          const idx = getPixelIdx(x, y);
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const avg = (r + g + b) / 3;
          // Feather: white-ish edge pixels get some transparency
          if (avg > 220) {
            output[idx + 3] = Math.max(0, Math.min(255, Math.round((255 - avg) * 3)));
          }
        }
      }
    }
  }

  console.log(`Removed ${removedCount} background pixels (${(removedCount / (width * height) * 100).toFixed(1)}%)`);

  await sharp(output, { raw: { width, height, channels } })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(outputPath);

  console.log(`Saved: ${outputPath}`);

  // Also update the website
  fs.copyFileSync(outputPath, 'd:\\Car Driving School\\cloned-site\\images\\kannan-logo.png');
  console.log('Updated website logo');
}

removeBackground().catch(console.error);

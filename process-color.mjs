import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'd:\\Car Driving School\\logo1.png';
const outputPath = 'd:\\Car Driving School\\logo1-transparent.png';

async function processImage() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const output = Buffer.from(data);

  function getPixelIdx(x, y) {
    return (y * width + x) * channels;
  }

  const visited = new Uint8Array(width * height);
  const isBackground = new Uint8Array(width * height);

  // We want to stop the floodfill at the solid black outline of the car.
  function isNotBlackOutline(x, y) {
     const idx = getPixelIdx(x, y);
     const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx+3];
     
     // Transparent pixels are background, so they are not the black outline
     if (a < 128) return true; 
     
     // Calculate brightness
     const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
     
     // If it's brighter than dark gray, it's NOT the black outline.
     // The car outline is very dark (mostly near 0).
     // The black tires are also very dark, so floodfill won't eat them.
     // The shadow under the car might be eaten if we set threshold high enough.
     return brightness > 80; 
  }

  // Flood fill from all edges.
  const queue = [];
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]); visited[0] = 1;
    queue.push([x, height - 1]); visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]); visited[y * width] = 1;
    queue.push([width - 1, y]); visited[y * width + (width - 1)] = 1;
  }

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    isBackground[y * width + x] = 1;

    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny * width + nx]) {
        visited[ny * width + nx] = 1;
        
        // If it's not the black outline, the floodfill can keep going.
        if (isNotBlackOutline(nx, ny)) {
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Process the image: apply transparency to background, keep original colors for the car
  let bgCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getPixelIdx(x, y);
      
      if (isBackground[y * width + x]) {
        // Pixel is part of the background/shadow: make it fully transparent
        output[idx] = 0;
        output[idx + 1] = 0;
        output[idx + 2] = 0;
        output[idx + 3] = 0;
        bgCount++;
      }
      // If it's NOT background, we do nothing (keep original colors!)
    }
  }

  console.log(`Identified ${bgCount} background/shadow pixels.`);

  // Save the result as high-res PNG
  await sharp(output, { raw: { width, height, channels } })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(outputPath);

  console.log(`Saved transparent image (with original colors) to: ${outputPath}`);

  // Update website logo as well
  fs.copyFileSync(outputPath, 'd:\\Car Driving School\\cloned-site\\images\\kannan-logo.png');
  console.log('Updated website logo with the newly processed color image.');
}

processImage().catch(console.error);

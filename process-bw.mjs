import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'd:\\Car Driving School\\logo1.png';
const outputPath = 'd:\\Car Driving School\\logo1-bw-transparent.png';

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

  // Pass 1: find bounding box of the car (excluding shadow)
  // The car is relatively centered. The shadow is at the bottom.
  // We can do a flood fill from edges to find the "background" (white/grayish/checkerboard).
  // Actually, the original logo has a white background with a shadow.
  // Since we want pure black and white, anything light = background or white car body.
  // The shadow is darkish gray, but we don't want it.
  // Let's use floodfill to remove background including shadow.
  
  const visited = new Uint8Array(width * height);
  const isBackground = new Uint8Array(width * height);

  function isBgColor(x, y) {
    const idx = getPixelIdx(x, y);
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const avg = (r + g + b) / 3;
    const variance = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    
    // White/light gray background
    if (avg > 240 && variance < 20) return true;
    
    // Checkerboard background (if processing transparent image)
    if (avg > 200 && variance < 20) return true;
    
    // Shadow at the bottom? The shadow is a gradient of gray.
    // Let's rely on floodfill to eat into light shadows, but maybe not dark ones.
    return false;
  }

  // For shadow and BG removal, it's easier to use the fact that the actual car outline is BLACK.
  // Everything OUTSIDE the solid black outline is background/shadow.
  // We can floodfill from edges. Any pixel that is NOT BLACK is background.
  function isNotBlackOutline(x, y) {
     const idx = getPixelIdx(x, y);
     const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx+3];
     if (a < 128) return true; // transparent is bg
     
     // Black outline threshold
     // The car outline is very dark (r,g,b < 50)
     const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
     
     return brightness > 80; // If it's brighter than dark gray, it's not the black outline.
  }

  // Flood fill from edges. It will stop at the solid black outline of the car!
  // This cleanly separates the car from the background and ground shadow (since ground shadow isn't protected by a black outline, the floodfill will eat it if we allow it to eat gray shadow).
  // Wait, the ground shadow is dark grey under the car. If brightness > 80 it's eaten. 
  // Is the shadow darker than 80? Some of it might be.
  
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

  // Now process!
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getPixelIdx(x, y);
      
      if (isBackground[y * width + x]) {
        // Transparent BG
        output[idx] = 0;
        output[idx + 1] = 0;
        output[idx + 2] = 0;
        output[idx + 3] = 0;
      } else {
        // INSIDE the car outline (or the outline itself)
        // Convert to pure B&W
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        const isRedish = (r > 130 && g < 100 && b < 100);
        
        // Make Black if dark or red
        // Make White if light
        if (brightness < 128 || isRedish) {
          // Pure Black
          output[idx] = 0;
          output[idx + 1] = 0;
          output[idx + 2] = 0;
          output[idx + 3] = 255;
        } else {
          // Pure White
          output[idx] = 255;
          output[idx + 1] = 255;
          output[idx + 2] = 255;
          output[idx + 3] = 255;
        }
      }
    }
  }

  // To fix any minor holes or noisy edges in the BW conversion
  
  await sharp(output, { raw: { width, height, channels } })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log(`Saved pure B&W transparent image to: ${outputPath}`);

  // Update website logo
  fs.copyFileSync(outputPath, 'd:\\Car Driving School\\cloned-site\\images\\kannan-logo.png');
  console.log('Updated website logo with B&W version');
}

processImage().catch(console.error);

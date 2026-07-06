/**
 * download-assets.js
 * Node script to download required web libraries (pdf.js) and fonts (Outfit, Playfair Display)
 * for offline, self-contained desktop use in Electron.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ASSETS = [
  // PDF.js
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
    dest: 'lib/pdf.min.js'
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js',
    dest: 'lib/pdf.worker.min.js'
  },
  // Fonts from Fontsource jsDelivr CDN (extremely lightweight woff2)
  {
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-400-normal.woff2',
    dest: 'fonts/Outfit-Regular.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-600-normal.woff2',
    dest: 'fonts/Outfit-SemiBold.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-400-normal.woff2',
    dest: 'fonts/PlayfairDisplay-Regular.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-600-normal.woff2',
    dest: 'fonts/PlayfairDisplay-SemiBold.woff2'
  },
  {
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-400-italic.woff2',
    dest: 'fonts/PlayfairDisplay-Italic.woff2'
  }
];

// Ensure directory exists
function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Download a single file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(dest);
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Download all assets
async function main() {
  console.log('Starting asset downloads for offline mode...');
  
  for (const asset of ASSETS) {
    try {
      await downloadFile(asset.url, asset.dest);
    } catch (err) {
      console.error(`Error downloading ${asset.dest}:`, err.message);
    }
  }
  
  console.log('Offline asset downloads complete.');
}

main();

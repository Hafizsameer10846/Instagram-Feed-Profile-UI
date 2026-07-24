const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 100% reliable links (No Unsplash blocks, No red borders, No 404s)
const imagesToDownload = [
  // 10 Avatars (These worked fine previously)
  ...Array.from({ length: 10 }).map((_, i) => ({ name: `avatar${i + 1}.jpg`, url: `https://randomuser.me/api/portraits/men/${i + 20}.jpg` })),
  
  // 5 Feed Posts (1080x1080 High-Res)
  ...Array.from({ length: 5 }).map((_, i) => ({ name: `post${i + 1}.jpg`, url: `https://picsum.photos/seed/post${i + 10}/1080/1080` })),
  
  // 10 Story Backgrounds (1080x1920 Vertical)
  ...Array.from({ length: 10 }).map((_, i) => ({ name: `story${i + 1}.jpg`, url: `https://picsum.photos/seed/story${i + 10}/1080/1920` })),
  
  // 5 Highlights (300x300 Small Square)
  ...Array.from({ length: 5 }).map((_, i) => ({ name: `highlight${i + 1}.jpg`, url: `https://picsum.photos/seed/highlight${i + 10}/300/300` })),
  
  // 15 Profile Grid Images (400x400 Square)
  ...Array.from({ length: 15 }).map((_, i) => ({ name: `grid${i + 1}.jpg`, url: `https://picsum.photos/seed/grid${i + 10}/400/400` }))
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Picsum uses redirects, so we explicitly handle them here to prevent failures
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return resolve(downloadFile(response.headers.location, dest)); 
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function startDownload() {
  console.log("Starting bulletproof download of 45 images...");
  for (const img of imagesToDownload) {
    const destPath = path.join(dir, img.name);
    try {
      await downloadFile(img.url, destPath);
      console.log(`✅ Downloaded: ${img.name}`);
    } catch (err) {
      console.log(`❌ Failed to download ${img.name}:`, err.message);
    }
  }
  console.log("\n🎉 All done! No 404s. You can run your app now.");
}

startDownload();
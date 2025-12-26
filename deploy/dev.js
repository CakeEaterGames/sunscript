
import { watch } from 'fs';
import { buildBrowserApp } from './common';

const outputPath = './local'

// Initial build
await buildBrowserApp(outputPath);

// Watch for changes in ./src directory
const watcher = watch('./src', { recursive: true }, async (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} changed, rebuilding...`);
    await buildBrowserApp(outputPath);
  }
});
// Watch for changes in ./src directory
const watcher2 = watch('./frontend', { recursive: true }, async (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} changed, rebuilding...`);
    await buildBrowserApp(outputPath);
  }
});
 

// Start server
const server = Bun.serve({
  port: 3456,
  async fetch(req) {
    const filePath = outputPath + new URL(req.url).pathname;
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response(Bun.file(outputPath+'/index.html'));
  },
  error() {
    return new Response('Not Found', { status: 404 });
  }
});

console.log(`Server running at http://localhost:3000`);
console.log('Watching for changes in ./src...');

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  watcher.close();
  server.stop();
  process.exit();
});
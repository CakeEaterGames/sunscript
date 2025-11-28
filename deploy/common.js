import { build } from "bun";
import { writeFileSync, readFileSync } from 'fs';

export async function buildBrowserApp(outputPath) {
  console.log('Building...');

  await build({
    entrypoints: ['./src/lib_browser.ts'],
    outdir: outputPath,
    target: 'browser',
    format: 'iife',
  });

  const html = readFileSync('./src/index.html', 'utf8');
  writeFileSync(outputPath + '/index.html', html);

  console.log('Build complete!');
}


export async function buildLibrary(outputPath, name, minify) {
  console.log('Building...');
  await build({
    entrypoints: ['./src/lib.ts'],
    outdir: outputPath,
    target: 'node',
    format: 'esm', // Use ESM format for cleaner output
    packages: 'external', // Externalize dependencies
    minify: minify ?
      {
        whitespace: true,
        syntax: true,
        identifiers: false, // This preserves function names
      }
      : false,
    sourcemap: 'none',
    splitting: false,
    naming: name
  });

  const outputFile = `${outputPath}/${name}`;
  let content = readFileSync(outputFile, 'utf-8');
  content = content
    // .replace(/^\/\/.*$/gm, '') // Remove comments
    .replace(/\s*export\s*\{[^}]+\};?\s*$/, ''); // Remove exports


  if (minify) {

  } else {
    //remove first 2 lines comment
    let start = "function(context,args) { // {import:true} \n"
    content = start + content.split('\n').slice(2).join('\n')
  }

  // function myLibrary() {

  writeFileSync(outputFile, content.trim());


  console.log('Build complete!');
}

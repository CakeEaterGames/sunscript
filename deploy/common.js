import { build } from "bun";
import { writeFileSync, readFileSync } from 'fs';


function convertToHM(code, mainFunc, autocomplete) {
  code = code.replace("window." + mainFunc, "__main__").replace(/\"\/\/\"/gm, '"\\/\\/"').replace(/\'\/\/\'/gm, "'\\/\\/'")

  let template = `
function(context,args){ // ${autocomplete}
  var __main__;
${code}
  return __main__(args);
}
`
  return template;
}


export async function buildBrowserApp(outputPath) {
  console.log('Building...');

  await build({
    // entrypoints: ['./src/lib_browser.ts'],
    entrypoints: ['./src/index.ts'],
    outdir: outputPath,
    target: 'browser',
    format: 'iife',
  });

  const html = readFileSync('./frontend/index.html', 'utf8');
  writeFileSync(outputPath + '/index.html', html);

  const ds = readFileSync('./frontend/dataset.js', 'utf8');
  writeFileSync(outputPath + '/dataset.js', ds);


  const fs = require('fs/promises');

  async function copyDirectory() {
    try {
      await fs.cp('./frontend', outputPath, {
        recursive: true,
        force: true  // overwrite existing files
      });
      console.log('All files copied successfully!');
    } catch (err) {
      console.error('Error copying files:', err);
    }
  }

  copyDirectory();



  console.log('Build complete!');
}


export async function buildLibrary(outputPath, name, minify) {
  console.log('Building...');
  await build({
    entrypoints: ['./src/index.ts'],
    outdir: outputPath,

    target: 'node',
    format: 'iife',

    minify: minify,
    // splitting: false,
    naming: name
  });

  const outputFile = `${outputPath}/${name}`;
  let content = readFileSync(outputFile, 'utf-8');

  content = convertToHM(content, "SUN", ``)

  writeFileSync(outputFile, content.trim());


  console.log('Build complete!');
}

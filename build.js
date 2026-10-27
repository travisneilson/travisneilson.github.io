const fs = require('fs');
const path = require('path');
const pug = require('pug');
const sass = require('sass');

const ROOT = __dirname;

const PUG_PAGES = [
  ['index.pug', 'index.html'],
  ['404.pug', '404.html'],
  ['videos/index.pug', 'videos/index.html'],
  ['speaking/index.pug', 'speaking/index.html'],
  ['podcasts/index.pug', 'podcasts/index.html'],
  ['music/index.pug', 'music/index.html'],
  ['writings/index.pug', 'writings/index.html'],
  ['writings/thanks.pug', 'writings/thanks.html'],
  ['more/index.pug', 'more/index.html'],
  ['prompts/index.pug', 'prompts/index.html'],
];

function buildCSS() {
  const entry = path.join(ROOT, 'css/style.sass');
  const out = path.join(ROOT, 'css/style.css');
  const result = sass.compile(entry, {
    style: 'expanded',
    silenceDeprecations: ['import', 'slash-div', 'global-builtin', 'color-functions'],
  });
  fs.writeFileSync(out, result.css, 'utf8');
  console.log('✓ Compiled css/style.sass -> css/style.css');
}

function buildPug() {
  for (const [srcRel, outRel] of PUG_PAGES) {
    const srcPath = path.join(ROOT, srcRel);
    const outPath = path.join(ROOT, outRel);
    if (!fs.existsSync(srcPath)) continue;
    const html = pug.renderFile(srcPath, {
      filename: srcPath,
       basedir: ROOT,
      pretty: false,
    });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`✓ Compiled ${srcRel} -> ${outRel}`);
  }
}

function buildAll() {
  buildCSS();
  buildPug();
}

buildAll();

if (process.argv.includes('--watch')) {
  console.log('Watching for changes in .pug and .sass/.scss files...');
  const watchDirs = ['.', 'includes', 'videos', 'speaking', 'podcasts', 'music', 'writings', 'more', 'prompts', 'css', 'css/0-tools', 'css/1-base', 'css/2-modules', 'css/3-layouts'];
  let timer = null;
  for (const dir of watchDirs) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;
    fs.watch(fullDir, (eventType, filename) => {
      if (!filename) return;
      if (filename.endsWith('.pug') || filename.endsWith('.sass') || filename.endsWith('.scss')) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            console.log(`\nChange detected in ${dir}/${filename}:`);
            buildAll();
          } catch (err) {
            console.error('Build error:', err.message);
          }
        }, 100);
      }
    });
  }
}

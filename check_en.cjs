const fs = require('fs');
const path = require('path');
function checkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      checkDir(p);
    } else if (p.endsWith('.tsx') && !p.includes('ZipCode')) {
      const content = fs.readFileSync(p, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((l, i) => {
        if (/>[\s]*[A-Za-z]+[\s]*[A-Za-z\s]*</.test(l)) {
          console.log(`${p}:${i+1} ${l.trim()}`);
        }
      });
    }
  });
}
checkDir('src/pages');
checkDir('src/components');

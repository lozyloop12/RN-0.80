const fs = require('fs');
const path = require('path');

function sync(dir) {
  console.log('*** Sync svgs ***');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const svgDirs = fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((f) => f.isFile() && f.name.endsWith('.svg'))
    .map((f) => f.name.split('.')[0]);

  const svgs = svgDirs.map((svgDir) => {
    const parts = svgDir.split('-');
    let name = '';
    for (let i = 0; i < parts.length; i++) {
      name +=
        parts[i][0].toUpperCase() + parts[i].substring(1, parts[i].length);
    }
    return 'Icon' + name;
  });

  const imports = svgDirs.reduce((ret, svgDir, idx) => {
    return (
      ret +
      `import ${svgs[idx]} from './${svgDir}.svg';` +
      (idx !== svgDirs.length - 1 ? '\n' : '')
    );
  }, '');

  const exports = svgs.reduce((ret, svg, idx) => {
    return ret + `  ${svg},\n` + (idx === svgs.length - 1 ? '};\n' : '');
  }, 'export {\n');

  if (svgs.length === 0) {
    return '// Icon\n\n// Export\nexport {};\n';
  }

  return `// Icon\n${imports}\n\n// Export\n${exports}`;
}

const svgsPath = path.join(__dirname, '../assets/svgs');

const output = sync(svgsPath);

fs.writeFile(path.join(__dirname, '../assets/svgs/index.ts'), output, (err) =>
  console.log(`Sync svgs ${err ? 'failed: ' + err : 'succeeded'}`),
);

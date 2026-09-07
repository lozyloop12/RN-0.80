const fs = require('fs');
const path = require('path');

function sync(dir) {
  console.log('*** Sync images ***');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const imageDirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (f) =>
        f.isFile() &&
        (f.name.endsWith('.png') ||
          f.name.endsWith('.jpg') ||
          f.name.endsWith('.jpeg')),
    )
    .map((f) => {
      const [fileName, type] = f.name.split('.');
      const [name] = fileName.split('@');
      return `${name}.${type}`;
    });

  const imageDirsUnique = [...new Set(imageDirs)];

  const images = imageDirsUnique.map((imageDir) => {
    const parts = imageDir.split('.')[0].split('-');
    let name = '';
    for (let i = 0; i < parts.length; i++) {
      name +=
        parts[i][0].toUpperCase() + parts[i].substring(1, parts[i].length);
    }
    return 'Img' + name;
  });

  const imports = imageDirsUnique.reduce((ret, imageDir, idx) => {
    return (
      ret +
      `import ${images[idx]} from './${imageDir}';` +
      (idx !== imageDirsUnique.length - 1 ? '\n' : '')
    );
  }, '');

  const exports = images.reduce((ret, img, idx) => {
    return ret + `  ${img},\n` + (idx === images.length - 1 ? '};\n' : '');
  }, 'export {\n');

  if (images.length === 0) {
    return '// Image\n\n// Export\nexport {};\n';
  }

  return `// Image\n${imports}\n\n// Export\n${exports}`;
}

const imagesPath = path.join(__dirname, '../assets/images');

const output = sync(imagesPath);

fs.writeFile(path.join(__dirname, '../assets/images/index.ts'), output, (err) =>
  console.log(`Sync images ${err ? 'failed: ' + err : 'succeeded'}`),
);

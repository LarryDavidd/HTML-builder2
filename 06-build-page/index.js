function callback(err) {
  if (err) throw err;
  console.log('file was copied');
}

async function copyFiles(url) {
  await fs.readdir(
    path.join(__dirname, url),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.copyFile(
            path.join(__dirname, url, file.name),
            path.join(__dirname, 'project-dist', url, file.name),
            callback,
          );
        } else {
          createFolder(path.join(url, file.name));
        }
      });
    },
  );
}

async function createFolder(url) {
  await fs.mkdir(
    path.join(__dirname, 'project-dist', url),
    { recursive: true },
    (err) => {
      if (err) throw err;
      console.log('folder was copied');
    },
  );

  await copyFiles(url);

  await writeStream();

  await combineHTML();
}

async function writeStream() {
  const output = await fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'style.css'),
  );
  await fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        const url = path.join(__dirname, 'styles', file.name);
        const input = fs.createReadStream(url, 'utf-8');
        if (path.extname(file.name).slice(1) == 'css') {
          input.on('data', (chunk) => output.write(chunk));
          input.on('error', (error) => console.log('Error', error.message));
        }
      });
    },
  );
}

async function combineHTML() {
  let template = await fs.promises.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    callback,
  );
  await fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.readFile(
          path.join(__dirname, 'components', file.name),
          'utf-8',
          (err, text) => {
            template = template.replace(
              `{{${file.name.split('.')[0]}}}`,
              `${text}`,
            );
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              template,
              callback,
            );
          },
        );
      });
    },
  );
}

const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
  console.log('folder was copied');
  createFolder('assets');
});

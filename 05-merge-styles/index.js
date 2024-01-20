function writeStream() {
  const output = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css'),
  );
  fs.readdir(
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

const fs = require('fs');
const path = require('path');

writeStream();

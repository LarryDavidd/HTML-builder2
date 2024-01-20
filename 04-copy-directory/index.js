function callback(err) {
  if (err) throw err;
}

function copyDir() {
  fs.readdir(
    path.join(__dirname, 'files'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file.name),
          path.join(__dirname, 'files-copy', file.name),
          callback,
        );
      });
    },
  );
}

function removeDir() {
  fs.readdir(
    path.join(__dirname, 'files-copy'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', file.name), callback);
      });
    },
  );
}

const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  removeDir();
  copyDir();
});

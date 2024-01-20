function copyDir(testFolder) {
  fs.readdir(testFolder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      const url = path.join(__dirname, 'secret-folder', file.name);

      if (file.isFile()) {
        fs.stat(url, (e, statfile) => {
          if (e) {
            console.log(e);
          } else {
            console.log(
              path.parse(file.name).name +
                ' - ' +
                path.extname(file.name).slice(1) +
                ' - ' +
                statfile.size +
                'b' +
                '\n',
            );
          }
        });
      }
    });
  });
}

const fs = require('fs');
const path = require('path');
const testFolder = path.join(__dirname, 'secret-folder');

copyDir(testFolder);

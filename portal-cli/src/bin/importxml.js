const fs = require('fs');
const { exec } = require('child_process');
const querystring = require('querystring');
const chalk = require('chalk');
const log = console.log;

const importxml = (filename) => {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.info(err);
    } else {
      const xml = querystring.escape(data);
      const payload = `{\\"xml\\":\\"${xml}\\"}`;
      const curlcomand = `curl -X POST "http://localhost:3001/import/string" -H "accept: */*" -H "Content-Type: application/json" -d "${payload}"`;
      exec(curlcomand, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        log(chalk.green(stderr));
        log(chalk.blue.bold(stdout));
      });
    }
  });
};

// Export All Methods
module.exports = {
  importxml
};

const { exec } = require('child_process');

const proc = exec('git log -1 --pretty=%h', (err, stdout, stderr) => {
  if (err) {
    console.log(stderr.toString());
    return;
  }
  console.log(stdout.toString());
});

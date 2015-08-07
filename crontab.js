var exec = require('child_process').exec,
    child;

var minutes = 180, the_interval = minutes * 60 * 1000;
console.log("Holi");

child = exec('casperjs scrapping.js 42',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

setInterval(function() {
    console.log("Holiwi");
  
    child = exec('casperjs scrapping.js 42',
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
  
  
}, the_interval);
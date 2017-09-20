var fs = require('fs');
var babel = require('babel-core');

// read the filename from the command line arguments
var fileName = 'test/case.js';
var secondFileName = 'test/baz.js';
var script = require('./')

// read the code from this file
fs.readFile(fileName, function(err, data) {
  if(err) throw err;

  // convert from a buffer to a string
  var src = data.toString();

  // use the plugin to transform the code
  var out = babel.transform(src, {
    plugins: [script]
  });

  // save the generated code into the test file so that babel change it on the second go
  fs.writeFile("test/run/case.js", out.code, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('finished 1/2');
    // read the code from the second file
    fs.readFile(secondFileName, function(err, data) {
      if(err) throw err;

      // convert from a buffer to a string
      var src = data.toString();

      // use the plugin to transform the code
      var out = babel.transform(src, {
        plugins: [script]
      });

      // save the generated code into the test file so that babel change it on the second go
      fs.writeFile("test/run/baz.js", out.code, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log('finished 2/2');
      });
    });
  });
});
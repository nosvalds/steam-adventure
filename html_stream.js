// Your program will get some html written to stdin. Convert all the inner
//   html to upper-case for elements with a class name of "loud", and pipe all
//   the html to stdout.

const trumpet = require("trumpet");
const tr = trumpet();
const through = require("through2");

const upper = through(write, end);

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

// select loud and send to stream
const loud = tr.select(".loud").createStream();
loud.pipe(upper).pipe(loud);

// html written to stdin - pipe to tr
process.stdin.pipe(tr).pipe(process.stdout);

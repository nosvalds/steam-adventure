const split2 = require("split2");
const through = require("through2");
const stream = through(write, end);
let line = 1;

function write(lineBuffer, _, next) {
  if (line % 2 === 0) {
    this.push(lineBuffer.toString().toUpperCase() + "\n");
  } else {
    this.push(lineBuffer.toString().toLowerCase() + "\n");
  }
  line += 1;
  next();
}

function end(done) {
  done();
}

process.stdin.pipe(split2()).pipe(stream).pipe(process.stdout);

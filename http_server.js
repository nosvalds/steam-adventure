const http = require("http");
const fs = require("fs");
const through = require("through2");
const stream = through(write, end);

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

const server = http.createServer(function (req, res) {
  if (req.method === "POST") {
    req.pipe(stream).pipe(res);
  } else res.end("send me a POST\n");
});
server.listen(process.argv[2]);

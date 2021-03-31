const duplexer2 = require("duplexer2");
const through2 = require("through2");

module.exports = function (counter) {
  // return a duplex stream to count countries on the writable side
  // and pass through `counter` on the readable side
  const counts = {};
  const stream = through2({ objectMode: true }, write, end);

  function write(row, encoding, next) {
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }

  return duplexer2(stream, counter);
};

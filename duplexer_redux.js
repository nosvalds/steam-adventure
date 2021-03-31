const duplexer2 = require("duplexer2");
const { Transform } = require("stream");

module.exports = function (counter) {
  // return a duplex stream to count countries on the writable side
  // and pass through `counter` on the readable side
  const counts = {};

  const myTransform = new Transform({
    objectMode: true,
    transform(row, encoding, next) {
      counts[row.country] = (counts[row.country] || 0) + 1;
      next();
    },
    flush(done) {
      counter.setCounts(counts);
      done();
    },
  });

  return duplexer2(myTransform, counter);
};

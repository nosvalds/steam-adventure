const { Writable } = require("stream");

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    console.log(`writing: ${chunk.toString()}`);
    callback();
  },
});

process.stdin.pipe(myWritable);

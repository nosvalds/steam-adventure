const { Readable } = require("stream");

const myReadable = new Readable({
  read(size) {},
});

myReadable.push(process.argv[2]);
myReadable.pipe(process.stdout);

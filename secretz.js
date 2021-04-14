const crypto = require("crypto");
const tar = require("tar");
const parser = new tar.Parse();
const concat = require("concat-stream");

const decrypt = crypto.createDecipheriv(
  process.argv[2],
  process.argv[3],
  process.argv[4]
);

parser.on("entry", function (e) {
  if (e.type !== "File") return e.resume();

  const hash = crypto.createHash("md5", { encoding: "hex" });
  e.pipe(hash).pipe(
    concat(function (hash) {
      console.log(hash + " " + e.path);
    })
  );
});

process.stdin.pipe(decrypt).pipe(parser);

// process.stdin -> decrypt -> unzip -> hash -> concat -> print

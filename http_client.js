const { request } = require("http");

// Send an HTTP POST request to (http://localhost:8099) and pipe
//   process.stdin into it. Pipe the response stream to process.stdout.

const options = { method: "POST" };
const req = request("http://localhost:8099/", options, (res) => {
  res.pipe(process.stdout);
});

process.stdin.pipe(req);

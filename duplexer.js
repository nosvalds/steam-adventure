const { spawn } = require("child_process");
const duplexer2 = require("duplexer2");

module.exports = function (cmd, args) {
  // spawn the process and return a single stream
  const childProc = spawn(cmd, args);
  // joining together the stdin and stdout here
  return duplexer2(childProc.stdin, childProc.stdout);
};

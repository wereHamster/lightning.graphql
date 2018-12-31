const fs = require("fs");
const program = require("commander");

program
  .version(require("../package.json").version)
  .option("-s, --socket [socket]", `Address (host:port) where LND is running`)
  .option("-m, --macaroon [path]", `Path to the readonly macaroon`);

program.parse(process.argv);

require("./server")({
  socket: program.socket,
  macaroon: fs.readFileSync(program.macaroon).toString("hex")
});

import * as fs from "fs";
import program from "commander";
import * as os from "os";
import * as path from "path";
import pkg from "../package.json";

const loadDefaults = () => {
  const homedir = os.homedir();
  const lndir = (() => {
    switch (os.platform()) {
      case "darwin":
        return path.join(homedir, "Library", "Application Support", "Lnd");
      case "linux":
        return path.join(homedir, ".lnd");
      case "win32":
        return path.join(homedir, "AppData", "Local", "Lnd");
    }

    throw new Error("OS not supported");
  })();

  return {
    macaroon: path.join(lndir, "readonly.macaroon"),
    certificate: path.join(lndir, "tls.cert")
  };
};

const main = async () => {
  const def = loadDefaults();

  program
    .version(pkg.version)
    .option(
      "-p, --port [port]",
      `Port where this server should listen on [4000]`,
      "4000"
    )
    .option(
      "-s, --socket [socket]",
      `Address (host:port) where LND is running`,
      "localhost:10009"
    )
    .option(
      "-m, --macaroon [path]",
      `Path to the readonly macaroon`,
      def.macaroon
    )
    .option(
      "-c, --certificate [path]",
      `Path to the TLS certificate`,
      def.certificate
    );

  program.parse(process.argv);

  (await import("./server.js")).default({
    port: parseInt(program.port, 10),
    socket: program.socket,
    macaroon: fs.readFileSync(program.macaroon).toString("hex"),
    certificate: program.certificate
      ? fs.readFileSync(program.certificate).toString("hex")
      : undefined
  });
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});

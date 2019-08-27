import * as fs from "fs";
import * as path from "path";
import ApolloServer from "apollo-server";

const typeDefs = fs.readFileSync(
  path
    .join(path.dirname(import.meta.url), "..", "lightning.graphql")
    .replace("file:", ""),
  "utf8"
);

export default async ({ port, socket, macaroon, certificate }) => {
  if (certificate) {
    process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";
  }

  const lnService = (await import("ln-service")).default;
  const { lnd } = lnService.authenticatedLndGrpc({
    socket,
    macaroon,
    cert: certificate
  });

  const resolvers = {
    Query: (await import("./resolvers/Query.js")),
    Node: (await import("./resolvers/Node.js")),
    Channel: (await import("./resolvers/Channel.js"))
  };

  const server = new ApolloServer.ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        lnd,
        cache: {
          nodeInfo: {},
          graph: undefined
        }
      };
    }
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

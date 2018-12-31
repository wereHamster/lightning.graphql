const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "..", "lightning.graphql"),
  "utf8"
);

module.exports = async ({ port, socket, macaroon, certificate }) => {
  if (certificate) {
    process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";
  }

  const lnService = require("ln-service");
  const lnd = lnService.lightningDaemon({
    socket,
    macaroon,
    cert: certificate
  });

  const resolvers = {
    Query: require("./resolvers/Query"),
    Node: require("./resolvers/Node"),
    Channel: require("./resolvers/Channel")
  };

  const server = new ApolloServer({
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

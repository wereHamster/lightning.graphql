process.env.GRPC_SSL_CIPHER_SUITES =
  "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384";

const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const lnService = require("ln-service");
const program = require("commander");

module.exports = async ({ socket, macaroon }) => {
  const typeDefs = fs.readFileSync(
    path.join(__dirname, "..", "lightning.graphql"),
    "utf8"
  );

  const resolvers = {
    Query: require("./resolvers/Query"),
    Node: require("./resolvers/Node"),
    Channel: require("./resolvers/Channel")
  };

  const lnd = lnService.lightningDaemon({
    socket,
    macaroon
  });

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

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

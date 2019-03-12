> GraphQL server for the Lightning network

This project implements a GraphQL server for the Lightning network. You can query nodes, channels, transactions and more. The requirements are pretty simple: you only need access to a LND server. Since this server implements only queries (no mutations), you should use the readonly macaroon.

Requirements:

 - Node and yarn
 - LND server (readonly macaroon and certificate)

Usage:

```
yarn start --macaroon path/to/readonly.macaroon --certificate path/to/tls.pem
```

See `yarn start --help` for more options.

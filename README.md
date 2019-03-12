> GraphQL server for the Lightning network

This project implements a GraphQL server for the Lightning network. You can query nodes, channels, transactions and more. The requirements are pretty simple: you only need access to a LND server. Since this server implements only queries (no mutations), you should use the readonly macaroon.

Requirements:

 - Node and yarn
 - LND server (readonly macaroon and certificate)

Usage:

```
yarn start
```

The server will attempt to connect to LND running on localhost:10009 and load the macaroon and certificate from the default location. You can customise these options and more. See `yarn start --help`.

### Use system trusted roots

Use `--certificate /dev/null` to trust the systemwide certificate roots. This is useful if you are using for example certificates issued by [Let's Encrypt](https://letsencrypt.org/).

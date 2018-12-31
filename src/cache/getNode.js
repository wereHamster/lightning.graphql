const getNode = require("ln-service/getNode");

module.exports = ({ lnd, cache }, publicKey) => {
  if (!(publicKey in cache.nodeInfo)) {
    console.log(`getNode(${publicKey})`);
    cache.nodeInfo[publicKey] = getNode({ lnd, public_key: publicKey });
  }
  return cache.nodeInfo[publicKey];
};

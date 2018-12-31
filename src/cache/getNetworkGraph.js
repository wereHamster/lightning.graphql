const getNetworkGraph = require("ln-service/getNetworkGraph");

module.exports = ({ lnd, cache }) => {
  if (!cache.graph) {
    console.log(`getNetworkGraph()`);
    cache.graph = getNetworkGraph({ lnd });
  }
  return cache.graph;
};

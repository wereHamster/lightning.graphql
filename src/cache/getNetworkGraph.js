import util from "util";
import lns from "ln-service";

const getNetworkGraph = util.promisify(lns.getNetworkGraph);
export default ({ lnd, cache }) => {
  if (!cache.graph) {
    console.log(`getNetworkGraph()`);
    cache.graph = getNetworkGraph({ lnd });
  }
  return cache.graph;
};

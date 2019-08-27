import util from "util";
import lns from "ln-service";

const getNode = util.promisify(lns.getNode);
export default ({ lnd, cache }, publicKey) => {
  if (!(publicKey in cache.nodeInfo)) {
    console.log(`getNode(${publicKey})`);
    cache.nodeInfo[publicKey] = getNode({ lnd, public_key: publicKey });
  }
  return cache.nodeInfo[publicKey];
};

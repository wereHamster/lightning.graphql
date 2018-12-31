const getNode = require("../cache/getNode");
const getNetworkGraph = require("../cache/getNetworkGraph");

exports.publicKey = async ({ id }) => {
  return id;
};

exports.alias = async ({ id }, _args, context) => {
  const nodeInfo = await getNode(context, id);
  return nodeInfo.alias;
};

exports.channels = async ({ id }, _args, context) => {
  const graph = await getNetworkGraph(context);

  return graph.channels
    .filter(c => c.policies.some(p => p.public_key === id))
    .map(c => {
      const toPort = policy => ({
        node: {
          id: policy.public_key
        },
        disabled: policy.is_disabled,
        forwardingPolicy: {
          minHTLC: policy.min_htlc_mtokens,
          baseFee: policy.base_fee_mtokens,
          feeRate: policy.fee_rate,
          timeLockDelta: policy.cltv_delta
        }
      });

      return {
        id: c.id,
        capacity: c.capacity,
        port1: toPort(c.policies[0]),
        port2: toPort(c.policies[1])
      };
    });
};

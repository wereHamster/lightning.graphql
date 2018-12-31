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
        disabled: policy.is_disabled
      });

      return {
        id: c.id,
        capacity: c.capacity,
        port1: toPort(c.policies[0]),
        port2: toPort(c.policies[1])
      };
    });
};

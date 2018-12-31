const getNetworkGraph = require("../cache/getNetworkGraph");

const lookupChannel = async (context, id) => {
  const graph = await getNetworkGraph(context);
  return graph.channels.find(c => c.id === id);
};

exports.channelId = ({ id }) => {
  return id;
};

exports.capacity = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  return c.capacity;
};

exports.port1 = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  const policy = c.policies[0];

  return {
    node: { id: policy.public_key },
    disabled: policy.is_disabled,
    forwardingPolicy: {
      minHTLC: policy.min_htlc_mtokens,
      baseFee: policy.base_fee_mtokens,
      feeRate: policy.fee_rate,
      timeLockDelta: policy.cltv_delta
    }
  };
};

exports.port2 = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  const policy = c.policies[1];

  return {
    node: { id: policy.public_key },
    disabled: policy.is_disabled,
    forwardingPolicy: {
      minHTLC: policy.min_htlc_mtokens,
      baseFee: policy.base_fee_mtokens,
      feeRate: policy.fee_rate,
      timeLockDelta: policy.cltv_delta
    }
  };
};

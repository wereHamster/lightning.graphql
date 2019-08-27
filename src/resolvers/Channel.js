import getNetworkGraph from "../cache/getNetworkGraph.js";

const lookupChannel = async (context, id) => {
  const graph = await getNetworkGraph(context);
  return graph.channels.find(c => c.id === id);
};

export const channelId = ({ id }) => {
  return id;
};

export const channelPoint = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  return {
    id: `${c.transaction_id}:${c.transaction_vout}`,
    transaction: { id: c.transaction_id, txid: c.transaction_id },
    outputIndex: c.transaction_vout
  };
};

export const capacity = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  return c.capacity;
};

export const port1 = async ({ id }, _args, context) => {
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

export const port2 = async ({ id }, _args, context) => {
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

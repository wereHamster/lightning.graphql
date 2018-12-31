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
  const { public_key, is_disabled } = c.policies[0];
  return { node: { id: public_key }, disabled: is_disabled };
};

exports.port2 = async ({ id }, _args, context) => {
  const c = await lookupChannel(context, id);
  const { public_key, is_disabled } = c.policies[1];
  return { node: { id: public_key }, disabled: is_disabled };
};

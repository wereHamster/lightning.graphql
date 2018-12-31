exports.node = (_, { publicKey }) => {
  return { id: publicKey, publicKey };
};

exports.channel = (_, { channelId }) => {
  return { id: channelId, channelId };
};

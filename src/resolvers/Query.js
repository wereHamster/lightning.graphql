export const node = (_, { publicKey }) => {
  return { id: publicKey, publicKey };
};

export const channel = (_, { channelId }) => {
  return { id: channelId, channelId };
};

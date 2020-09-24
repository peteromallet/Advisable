import React from "react";
import hash from "object-hash";

const useChannel = ({ participantIds = [] }) => {
  const channelId = hash(participantIds.sort());
  let channel;
  return { channel };
};

export default useChannel;

// chatClient.getSubscribedChannels().then(function(paginator) {
//   for (i = 0; i < paginator.items.length; i++) {
//     const channel = paginator.items[i];
//     console.log('Channel: ' + channel.friendlyName);
//   }
// });

import Talk from "talkjs";
import { get } from "lodash";
import useTalkSession from "./useTalkSession";

const useTalkMessenger = config => {
  const talkSession = useTalkSession();
  const conversation = talkSession.getOrCreateConversation(config.conversation);
  conversation.setParticipant(talkSession.me);

  const participants = get(config, "participants", []);
  participants.forEach(participant => {
    const user = new Talk.User({
      id: participant.id,
      name: participant.name,
      role: participant.__typename === "User" ? "client" : "freelancer",
    });

    conversation.setParticipant(user);
  });

  const handleOpen = () => {
    const popup = talkSession.createPopup(conversation, { keepOpen: false });
    popup.mount();
  };

  return { open: handleOpen };
};

export default useTalkMessenger;

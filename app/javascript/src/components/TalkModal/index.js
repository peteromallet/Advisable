// Used to render a talkjs conversation inside of a modal window. TalkModal
// takes four props.
// - isOpen (boolean): Wether or not the modal should be shown. This is passed
// directly through to the Modal component. Modals are always controlled
// components and they do not hold their own state.
// - onClose (function): A function that when called will set the isOpen prop
// to false, which will close the modal.
// - conversationId (string): The talkjs conversation id. This is usually the
// application record id.
// - participants (array): An array of specialist or user objects which will be
// addd the conversation. Usually this is just a single object representing the
// receipient of the message. This object is expected to have an id, name and
// __typename attribute.
import React from "react";
import Modal from "../Modal";
import Talk from "talkjs";
import Div100vh from "react-div-100vh";
import { useBreakpoint } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import createTalkSession from "../../utilities/createTalkSession";

const TalkModal = ({ isOpen, onClose, conversationId, participants }) => {
  const viewer = useViewer();
  const isMobile = useBreakpoint("s");
  const messengerRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen === false) return;

    Talk.ready.then(() => {
      const session = createTalkSession(viewer);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(session.me);

      participants.forEach(participant => {
        const user = new Talk.User({
          id: participant.id,
          name: participant.name,
          email: participant.email,
          role: participant.__typename === "User" ? "Client" : "Specialist",
        });

        conversation.setParticipant(user);
      });

      const chatbox = session.createChatbox(conversation);
      chatbox.mount(messengerRef.current);
    });
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} expandOnMobile>
      <Div100vh style={{ height: isMobile ? "100rvh" : "auto" }}>
        <div
          ref={messengerRef}
          style={{
            height: isMobile ? "100%" : 500,
            maxHeight: "100%",
          }}
        />
      </Div100vh>
    </Modal>
  );
};

export default TalkModal;

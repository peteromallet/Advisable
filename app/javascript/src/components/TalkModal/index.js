import React from "react";
import TalkModal from "./TalkModal";
import SendMessage from "./SendMessage";

const SendMessageModal = (props) => {
  const messagesVersion = sessionStorage.getItem("/messages");

  if (messagesVersion == 2) {
    return <SendMessage {...props} />;
  }

  return <TalkModal {...props} />;
};

export default SendMessageModal;

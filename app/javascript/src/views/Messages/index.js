import React from "react";

const Messages = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    var inbox = talkSession.createInbox();
    inbox.mount(container.current);
  }, container);

  return <div ref={container} style={{ height: "calc(100vh - 60px)" }} />;
};

export default Messages;

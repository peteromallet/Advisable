import React from "react";
import queryString from "query-string";
import useTalkSession from "../../hooks/useTalkSession";

const Messages = ({ location }) => {
  const container = React.useRef(null);
  const queryParams = queryString.parse(location.search);
  const talkSession = useTalkSession();

  React.useEffect(() => {
    // talkSession.syncThemeForLocalDev("./talkjs.css");
    var inbox = talkSession.createInbox({ style: { background: "white" } });
    inbox.mount(container.current);

    if (queryParams.conversation) {
      inbox.select(queryParams.conversation);
    }
  }, container);

  return (
    <div
      ref={container}
      style={{ maxWidth: 1050, margin: "0 auto", height: "calc(100vh - 60px)" }}
    />
  );
};

export default Messages;

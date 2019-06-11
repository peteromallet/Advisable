import React from "react";
import queryString from "query-string";

const Messages = ({ location }) => {
  const container = React.useRef(null);
  const queryParams = queryString.parse(location.search);

  React.useEffect(() => {
    var inbox = talkSession.createInbox();
    inbox.mount(container.current);

    if (queryParams.conversation) {
      inbox.select(queryParams.conversation);
    }
  }, container);

  return <div ref={container} style={{ height: "calc(100vh - 60px)" }} />;
};

export default Messages;

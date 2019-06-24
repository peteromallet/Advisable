import React from "react";
import Div100vh from "react-div-100vh";
import queryString from "query-string";
import useTalkSession from "../../hooks/useTalkSession";

const Messages = ({ location }) => {
  const container = React.useRef(null);
  const queryParams = queryString.parse(location.search);
  const talkSession = useTalkSession();

  React.useEffect(() => {
    // talkSession.syncThemeForLocalDev("/talkjs.css");
    var inbox = talkSession.createInbox({
      showChatHeader: false,
      showFeedHeader: false,
    });
    inbox.mount(container.current);

    if (queryParams.conversation) {
      inbox.select(queryParams.conversation);
    }
  }, container);

  return (
    <Div100vh style={{ height: "calc(100rvh - 60px)" }}>
      <div
        ref={container}
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          height: "100%",
        }}
      />
    </Div100vh>
  );
};

export default Messages;

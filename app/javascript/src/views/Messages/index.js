import React from "react";
import Div100vh from "react-div-100vh";
import queryString from "query-string";
import { useBreakpoint } from "@advisable/donut";
import useTalkSession from "../../hooks/useTalkSession";
import { Container, Main } from "./styles";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

const Messages = ({ location }) => {
  const isMobile = useBreakpoint("m");
  const container = React.useRef(null);
  const [applicationId, setAppliationId] = React.useState(null);
  const queryParams = queryString.parse(location.search);
  const talkSession = useTalkSession();

  React.useEffect(() => {
    talkSession.syncThemeForLocalDev("/talkjs.css");
    var inbox = talkSession.createInbox({
      showChatHeader: false,
      showFeedHeader: false,
    });
    inbox.mount(container.current);

    inbox.on("conversationSelected", e => {
      if (e.conversation) {
        setAppliationId(e.conversation.id);
      } else {
        setAppliationId(null);
      }
    });

    if (queryParams.conversation) {
      inbox.select(queryParams.conversation);
    }
  }, container);

  return (
    <>
      {Boolean(applicationId) && isMobile && (
        <TopBar applicationId={applicationId} />
      )}
      <Container>
        <Main>
          <Div100vh
            style={{
              height: isMobile ? "calc(100rvh - 180px)" : "calc(100rvh - 60px)",
            }}
          >
            <div
              ref={container}
              style={{
                height: "100%",
              }}
            />
          </Div100vh>
        </Main>
        {Boolean(applicationId) && <Sidebar applicationId={applicationId} />}
      </Container>
    </>
  );
};

export default Messages;

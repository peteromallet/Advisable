import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useMachine } from "@xstate/react";
import ExpandableText from "@advisable-main/components/ExpandableText";
import useViewer from "@advisable-main/hooks/useViewer";
import { useToggle } from "@guild/hooks/useToggle";
import {
  Text,
  Avatar,
  Link,
  Textarea,
  useBreakpoint,
  Input,
} from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { StyledModal, ModalClose } from "./styles";
import { PhoneCall, MessagesFill } from "@guild/icons";
import { SubmitButton } from "@guild/components/Buttons/styles";
import HelpButton from "@guild/components/Post/components/HelpButton";
import Mask from "@guild/components/Mask";
import MessageWithAction from "@guild/components/MessageWithAction";
import { CREATE_CHAT_DIRECT_MESSAGE } from "./mutations";
import { offerMachine } from "./offerMachine";

const OfferHelp = ({ recipient, guildPostId, engagementsCount }) => {
  const viewer = useViewer();
  const [messageBody, setMessageBody] = useState("");
  const [calendlyLink, setCalendlyLink] = useState(
    viewer?.guildCalendlyLink || "",
  );
  const [engagements, setEngagments] = useState(engagementsCount || 0);
  const mUp = useBreakpoint("mUp");

  const [offerHelpModal, toggleOfferHelpModal] = useToggle(false);
  const handleToggleOfferModal = () => {
    toggleOfferHelpModal();
    setMessageBody("");
    send("RESET");
  };

  const [current, send, service] = useMachine(offerMachine);
  // useEffect(() => {
  //   const subscription = service.subscribe((state) => console.debug(state));
  //   return subscription.unsubscribe;
  // }, [service]);

  const handleSubmitMessage = async () => {
    if (!messageBody.length) return;
    await createChatDirectMessage({
      variables: {
        input: {
          recipientId: recipient.id,
          guildPostId,
          body: messageBody,
          guildCalendlyLink: current.matches("call") ? calendlyLink : null,
        },
      },
    });
    send("SENT");
    setEngagments((prev) => prev + 1);
  };
  const [createChatDirectMessage, { loading }] = useMutation(
    CREATE_CHAT_DIRECT_MESSAGE,
  );

  const canSubmit = React.useMemo(
    () =>
      current.matches("call")
        ? messageBody.length && calendlyLink.length
        : messageBody.length,
    [current, messageBody, calendlyLink],
  );

  return (
    <>
      <HelpButton onToggle={handleToggleOfferModal} engagements={engagements} />

      {offerHelpModal && (
        <StyledModal
          display="flex"
          flexDirection="column"
          px={{ _: "m", m: "2xl" }}
          py="58px"
        >
          <ModalClose onClose={handleToggleOfferModal} />
          <GuildBox spaceChildrenHorizontal={34} mb="l">
            <GuildBox display="flex" flexShrink={0}>
              <Avatar
                as={Link}
                to={`/profiles/${recipient.id}`}
                size={{ _: "l", m: "xxl" }}
                name={recipient.name}
                url={recipient.avatar}
              />
            </GuildBox>
            <GuildBox spaceChildrenVertical={mUp && 8} alignSelf="center">
              <Text fontSize="xxl" fontWeight="medium" color="catalinaBlue100">
                {recipient.name}
              </Text>
              <GuildBox>
                {mUp && <Label label="Location" />}
                <Text
                  fontSize={{ _: "m", m: "l" }}
                  lineHeight="l"
                  fontWeight="light"
                  color="catalinaBlue100"
                >
                  {recipient.location}
                </Text>
              </GuildBox>
              {mUp && <Bio bio={recipient.bio} />}
            </GuildBox>
          </GuildBox>
          {!mUp && <Bio bio={recipient.bio} />}

          {!current.matches("pending") ? (
            <>
              {current.matches("sent") ? (
                <MessageWithAction
                  message="Sent an Offer to help!"
                  actionText="Check Inbox"
                  actionLink="/messages"
                  suffix
                />
              ) : (
                <>
                  <GuildBox spaceChildrenVertical={16}>
                    <Text
                      color="catalinaBlue100"
                      mt="m"
                      fontWeight="medium"
                      size="l"
                    >
                      {current.matches("call")
                        ? "What would you like to say alongside this offer?"
                        : `Please include your message to ${recipient.firstName} here`}
                    </Text>
                    <Textarea
                      value={messageBody}
                      minRows={3}
                      maxRows={8}
                      marginBottom="s"
                      placeholder="Add a message ..."
                      onChange={({ target }) => setMessageBody(target.value)}
                      marginTop={{ _: "l", m: "0" }}
                    />
                    {current.matches("call") && (
                      <>
                        <Input
                          prefix="Calendly Link"
                          required
                          value={calendlyLink}
                          onChange={({ currentTarget }) =>
                            setCalendlyLink(currentTarget.value)
                          }
                        />
                      </>
                    )}
                    <SubmitButton
                      size="l"
                      loading={loading}
                      onClick={handleSubmitMessage}
                      disabled={!canSubmit}
                      type="submit"
                    >
                      Send
                    </SubmitButton>
                  </GuildBox>
                </>
              )}
            </>
          ) : (
            /* 
              Pending: No offer state selected
            */
            <GuildBox flexCenterBoth mt="xl">
              <GuildBox spaceChildrenVertical={20}>
                <Text size="3xl" fontWeight="medium" color="catalinaBlue100">
                  How would you like to help {recipient.firstName}?
                </Text>

                <GuildBox flexSpaceBetween>
                  <SubmitButton
                    size={mUp ? "l" : "s"}
                    onClick={() => send("CALL")}
                  >
                    <PhoneCall size={18} fill={"white"} />
                    <Text fontWeight="medium" size="l" color="white">
                      Offer Call
                    </Text>
                  </SubmitButton>

                  <SubmitButton
                    size={mUp ? "l" : "s"}
                    onClick={() => send("MESSAGE")}
                  >
                    <MessagesFill size={18} fill={"white"} />
                    <Text fontWeight="medium" size="l" color="white">
                      Message
                    </Text>
                  </SubmitButton>
                </GuildBox>
              </GuildBox>
            </GuildBox>
          )}
        </StyledModal>
      )}

      <Mask
        header={false}
        isOpen={offerHelpModal}
        toggler={handleToggleOfferModal}
      />
    </>
  );
};

const Label = ({ label }) => (
  <Text fontSize="xs" fontWeight="light" color="darkGrey">
    {label}
  </Text>
);

const Bio = ({ bio }) => (
  <GuildBox>
    <Label label="Bio" />
    <ExpandableText
      fontSize="m"
      lineHeight="l"
      fontWeight="light"
      color="quartz"
    >
      {bio}
    </ExpandableText>
  </GuildBox>
);

export default OfferHelp;

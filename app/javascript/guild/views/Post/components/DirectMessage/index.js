import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import ExpandableText from "@advisable-main/components/ExpandableText";
import { useToggle } from "@guild/hooks/useToggle";
import { Messages } from "@guild/icons";
import { Text, Avatar, Link, Textarea, useBreakpoint } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { StyledModal } from "./styles";
import { MessageButton, SubmitButton } from "@guild/components/Buttons/styles";
import Mask from "@guild/components/Mask";
import { CREATE_CHAT_DIRECT_MESSAGE } from "./mutations";

const DirectMessage = ({ count, recipient }) => {
  const [body, setBody] = useState(null);
  const [createChatDirectMessage, { data, loading }] = useMutation(
    CREATE_CHAT_DIRECT_MESSAGE,
  );

  const [messageModal, toggleMessageModal] = useToggle(false);
  const mUp = useBreakpoint("mUp");

  const handleSubmit = async () => {
    if (!body.length) return;
    await createChatDirectMessage({
      variables: { input: { participantId: recipient.id, body } },
    });
  };

  return (
    <>
      <MessageButton flexCenterBoth onClick={toggleMessageModal} count={count}>
        <Messages size={28} />
      </MessageButton>

      {messageModal && (
        <StyledModal
          display="flex"
          flexDirection="column"
          px={{ _: "m", m: "2xl" }}
          py="58px"
        >
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

          {/* TODO: Formik  */}
          <Textarea
            value={body}
            minRows={3}
            maxRows={8}
            marginBottom="s"
            placeholder="Add your message here ..."
            onChange={({ target }) => setBody(target.value)}
            marginTop={{ _: "l", m: "0" }}
          />
          <SubmitButton loading={loading} onClick={handleSubmit} type="submit">
            Submit
          </SubmitButton>
        </StyledModal>
      )}

      <Mask isOpen={messageModal} header={false} toggler={toggleMessageModal} />
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

export default DirectMessage;

import React, { useState, useMemo } from "react";
import commaSeparated from "src/utilities/commaSeparated";
import { Box, Modal, Textarea, Heading, Stack, Button } from "@advisable/donut";
import { useCreateConversation } from "./queries";
import useAttachments from "src/views/NewMessages/hooks/useAttachments";
import AddAttachmentsButton from "src/views/NewMessages/components/AddAttachmentsButton";
import Attachment from "src/views/NewMessages/components/Attachment";

export default function SendMessage({ dialog, participants }) {
  const [content, setContent] = useState("");
  const [sendMessage, { loading }] = useCreateConversation();
  const {
    signedIds,
    attachments,
    addAttachments,
    completeUpload,
    removeAttachment,
  } = useAttachments();

  const trimmedContent = useMemo(() => {
    return content.trim().replace(/^\s+|\s+$/g, "");
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendMessage({
      variables: {
        input: {
          content: trimmedContent,
          attachments: signedIds,
          participants: participants.map((p) => p.account.id),
        },
      },
    });

    dialog.hide();
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const hasAttachments = useMemo(() => {
    return attachments.length > 0;
  }, [attachments]);

  const hasContent = useMemo(() => {
    return trimmedContent.length > 0;
  }, [trimmedContent]);

  const names = participants.map((p) => p.account.firstName);

  return (
    <Modal modal={dialog}>
      <Heading size="3xl" mb={4}>
        Message {commaSeparated(names)}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Textarea
          autoFocus
          minRows={8}
          name="content"
          marginBottom={4}
          placeholder="Send a message..."
          onChange={handleChange}
        />

        {hasAttachments && (
          <Stack pb={4} divider="neutral100">
            {attachments.map((a) => (
              <Attachment
                key={a.id}
                attachment={a}
                completeUpload={completeUpload}
                onRemove={() => removeAttachment(a.id)}
              />
            ))}
          </Stack>
        )}
        <Box mb={8}>
          <AddAttachmentsButton
            onSelect={(e) => addAttachments(e.target.files)}
          />
        </Box>
        <Button
          width="100%"
          loading={loading}
          disabled={!(hasContent || hasAttachments)}
        >
          Send Message
        </Button>
      </form>
    </Modal>
  );
}

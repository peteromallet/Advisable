import React, { useState, useMemo } from "react";
import commaSeparated from "src/utilities/commaSeparated";
import { Modal, Textarea, Heading, Button } from "@advisable/donut";
import { useCreateConversation } from "./queries";

export default function SendMessage({ dialog, participants }) {
  const [content, setContent] = useState("");
  const [sendMessage, { loading }] = useCreateConversation();

  const trimmedContent = useMemo(() => {
    return content.trim().replace(/^\s+|\s+$/g, "");
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendMessage({
      variables: {
        input: {
          content: trimmedContent,
          participants: participants.map((p) => p.account.id),
        },
      },
    });

    dialog.hide();
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

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
          marginBottom={6}
          placeholder="Send a message..."
          onChange={handleChange}
        />
        <Button loading={loading} disabled={!hasContent}>
          Send Message
        </Button>
      </form>
    </Modal>
  );
}

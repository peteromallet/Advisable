import React, { useState } from "react";
import { StyledComposer } from "./styles";
import { Send } from "@styled-icons/ionicons-solid";
import { Button, Textarea } from "@advisable/donut";

export default function Composer({ onSubmit }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    await onSubmit(message);
    setMessage("");
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <StyledComposer>
      <Textarea
        minRows="3"
        maxRows="5"
        name="message"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
        placeholder="New Message ..."
      ></Textarea>
      <Button
        size="s"
        prefix={<Send />}
        loading={loading}
        disabled={loading}
        onClick={handleSubmit}
        data-testid="sendMessage"
      >
        Send
      </Button>
    </StyledComposer>
  );
}

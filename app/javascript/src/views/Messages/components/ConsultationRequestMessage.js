import React, { useEffect, useMemo } from "react";
import { Box, Text, Circle } from "@advisable/donut";
import { BaseMessage } from "./Message";
import useViewer from "src/hooks/useViewer";
import { Calendar } from "@styled-icons/heroicons-solid";
import ConsultationRequestModal from "./ConsultationRequestModal";
import { useMessagePrompt } from "./MessagePrompt";

function ConsultationRequestMessageForSpecialist({ message }) {
  const sender = message.author?.name;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New consultation request",
  );

  const isPending = useMemo(() => {
    return message.consultation?.status === "Request Completed";
  }, [message]);

  useEffect(() => {
    if (isPending) {
      show();
    } else {
      dismiss();
    }
  }, [show, dismiss, isPending]);

  return (
    <BaseMessage message={message} highlight={highlight}>
      <Box
        padding={4}
        borderRadius="20px"
        border="2px solid"
        borderColor="neutral100"
        display="flex"
        alignItems="center"
      >
        <Circle size={40} bg="blue100" color="blue600">
          <Calendar size={20} />
        </Circle>
        <Box paddingLeft={3} flex={1}>
          <Text fontWeight={560} marginBottom={1}>
            {sender} requested a call with you
          </Text>
          <Text>
            After your call you will be able to send a request to work together
          </Text>
        </Box>
        {isPending && (
          <Box>
            <ConsultationRequestModal message={message} sender={sender} />
          </Box>
        )}
      </Box>
    </BaseMessage>
  );
}

function ConsultationRequestMessageForClient({ message }) {
  return (
    <BaseMessage message={message}>
      <Box paddingY={3} paddingX={4} bg="neutral100" borderRadius="12px">
        You sent a consultation request.
      </Box>
    </BaseMessage>
  );
}

export default function ConsultationRequestMessage({ message }) {
  const viewer = useViewer();

  return viewer.isSpecialist ? (
    <ConsultationRequestMessageForSpecialist message={message} />
  ) : (
    <ConsultationRequestMessageForClient message={message} />
  );
}

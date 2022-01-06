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
    const consultation = message.consultation;
    const interview = consultation?.interview;

    if (
      consultation?.status === "Accepted By Specialist" &&
      interview?.status === "Call Requested"
    ) {
      return true;
    }

    return consultation?.status === "Request Completed";
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
        borderColor="neutral300"
        display="flex"
        alignItems="center"
      >
        <Circle size={40} bg="neutral200" color="neutral800">
          <Calendar size={20} />
        </Circle>
        <Box paddingLeft={3} flex={1}>
          <Text fontSize="17px" fontWeight={560} marginBottom={1}>
            {sender} requested a call with you
          </Text>
          <Text color="neutral600" fontSize="sm">
            Check their availability and schedule a call to find out more
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

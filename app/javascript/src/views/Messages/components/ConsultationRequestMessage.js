import React, { useEffect } from "react";
import {
  useModal,
  DialogDisclosure,
  Box,
  Text,
  Button,
  Circle,
} from "@advisable/donut";
import { BaseMessage } from "./Message";
import useViewer from "src/hooks/useViewer";
import { Calendar } from "@styled-icons/heroicons-solid";
import ConsultationRequestModal from "./ConsultationRequestModal";
import { useMessagePrompt } from "./MessagePrompt";

function ConsultationRequestMessageForSpecialist({ message }) {
  const modal = useModal();
  const sender = message.author?.name;

  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Box
            {...disclosure}
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
                {sender} has requested a call with you
              </Text>
              <Text>
                After your call you will be able to send a request to work
                together
              </Text>
            </Box>
            <Box>
              <Button variant="dark" size="s">
                View
              </Button>
            </Box>
          </Box>
        )}
      </DialogDisclosure>
      <ConsultationRequestModal
        modal={modal}
        message={message}
        sender={sender}
      />
    </>
  );
}

function ConsultationRequestMessageForClient() {
  return (
    <Box paddingY={3} paddingX={4} bg="neutral100" borderRadius="12px">
      You sent a consultation request.
    </Box>
  );
}

export default function ConsultationRequestMessage({ message }) {
  const viewer = useViewer();
  const { prompt, dismiss } = useMessagePrompt();

  useEffect(() => {
    if (message.consultation?.status === "Request Completed") {
      prompt(message, "New consultation request");
    } else {
      dismiss();
    }
  }, [prompt, dismiss, message]);

  return (
    <BaseMessage message={message}>
      <Box paddingTop={5}>
        {viewer.isSpecialist ? (
          <ConsultationRequestMessageForSpecialist message={message} />
        ) : (
          <ConsultationRequestMessageForClient message={message} />
        )}
      </Box>
    </BaseMessage>
  );
}

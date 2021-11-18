import React from "react";
import {
  Box,
  Text,
  useModal,
  DialogDisclosure,
  Circle,
} from "@advisable/donut";
import EditInfoModal from "./EditInfo/EditInfoModal";
import {
  ArrowNarrowRight,
  Identification,
} from "@styled-icons/heroicons-solid";
import CardButton from "src/components/CardButton";

export default function SetUsernamePrompt({ specialist }) {
  const modal = useModal();
  return (
    <>
      <EditInfoModal modal={modal} specialist={specialist} />
      <Box marginBottom={11}>
        <DialogDisclosure {...modal} size="s">
          {(disclosure) => (
            <CardButton {...disclosure} padding={5}>
              <Box display="flex" alignItems="center" width="100%">
                <Circle bg="blue100" size={40} marginRight={3} color="blue900">
                  <Identification size={20} />
                </Circle>
                <Box
                  flex={1}
                  marginTop={{ _: 3, s: 0 }}
                  marginBottom={{ _: 4, s: 0 }}
                >
                  <Text
                    fontSize="lg"
                    fontWeight={560}
                    marginBottom={0.5}
                    color="neutral900"
                  >
                    Set your username
                  </Text>
                  <Text fontSize="sm">
                    Customize your profile URL by setting a username.
                  </Text>
                </Box>
                <ArrowNarrowRight size={20} />
              </Box>
            </CardButton>
          )}
        </DialogDisclosure>
      </Box>
    </>
  );
}

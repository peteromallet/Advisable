import React from "react";
import { darken } from "polished";
import {
  Box,
  Text,
  theme,
  useModal,
  DialogDisclosure,
  Circle,
} from "@advisable/donut";
import EditInfoModal from "./EditInfo/EditInfoModal";
import {
  ArrowNarrowRight,
  Identification,
} from "@styled-icons/heroicons-solid";
import SectionTitle from "./SectionTitle";

export default function SetUsernamePrompt({ specialist }) {
  const modal = useModal();
  return (
    <>
      <EditInfoModal modal={modal} specialist={specialist} />
      <Box marginBottom={12}>
        <SectionTitle>Setup your profile</SectionTitle>
        <DialogDisclosure {...modal} size="s">
          {(disclosure) => (
            <Box
              padding={5}
              bg="blue50"
              marginTop={3}
              borderRadius="16px"
              alignItems="center"
              display={{ _: "block", s: "flex" }}
              css={{
                outline: "none",
                cursor: "pointer",
                "&:hover": {
                  background: darken(0.016, theme.colors.blue50),
                },
              }}
              {...disclosure}
            >
              <Circle bg="blue200" size={40} marginRight={4} color="blue900">
                <Identification size={20} />
              </Circle>
              <Box
                flex={1}
                marginTop={{ _: 3, s: 0 }}
                marginBottom={{ _: 4, s: 0 }}
              >
                <Text fontSize="lg" fontWeight={560} marginBottom={0.5}>
                  Set your username
                </Text>
                <Text>Customize your profile URL by setting a username.</Text>
              </Box>
              <ArrowNarrowRight size={20} />
            </Box>
          )}
        </DialogDisclosure>
      </Box>
    </>
  );
}

import React from "react";
import { truncate } from "lodash-es";
import {
  Avatar,
  Box,
  Text,
  Icon,
  useModal,
  Button,
  DialogDisclosure,
} from "@advisable/donut";
import LineClamp from "../LineClamp";
import TagCloud from "./TagCloud";
import Attributes from "./Attributes";
import SpecialistModal from "./SpecialistModal";
import { StyledSpecialistCard, StyledSpecialistName } from "./styles";

const SpecialistCard = ({ specialist, action, ...props }) => {
  const specialistModal = useModal();

  return (
    <StyledSpecialistCard padding="m" {...props}>
      <Avatar mb="m" size="l" name={specialist.name} url={specialist.avatar}>
        {specialist.ratings.overall && (
          <Box
            px="xs"
            zIndex={2}
            height={24}
            fontSize="13px"
            bg="yellow.5"
            fontWeight="semibold"
            color="white.9"
            borderRadius={12}
            alignItems="center"
            position="absolute"
            display="inline-flex"
            border="2px solid"
            borderColor="white.9"
            left="50px"
            top="50px"
          >
            <Box mr="xxs">
              <Icon icon="star" width={13} height={13} fill="white" />
            </Box>
            {specialist.ratings.overall}
          </Box>
        )}
      </Avatar>
      <StyledSpecialistName onClick={specialistModal.show}>
        {specialist.name}
      </StyledSpecialistName>
      <Text color="neutral.7" fontSize="xs" letterSpacing="-0.01em">
        {truncate(specialist.location, { length: 40 })}
      </Text>
      <Attributes specialist={specialist} />
      <Text fontSize="xxs" lineHeight="xs" color="neutral.8" mb="m">
        <LineClamp maxHeight={80}>{specialist.bio}</LineClamp>
      </Text>
      <TagCloud
        maxRows={2}
        tags={specialist.skills.slice(0, 5)}
        name={specialist.firstName}
      />
      <SpecialistModal modal={specialistModal} specialistId={specialist.id} />
      <Box position="absolute" bottom={20} left={20}>
        {action && (
          <Box display="inline-block" mr="xs">
            {action}
          </Box>
        )}
        <DialogDisclosure
          as={Button}
          aria-label={`View ${specialist.name}`}
          onClick={specialistModal.show}
          variant="subtle"
          prefix={<Icon icon="external-link" />}
        >
          View More
        </DialogDisclosure>
      </Box>
    </StyledSpecialistCard>
  );
};

export default SpecialistCard;

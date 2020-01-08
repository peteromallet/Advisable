import React from "react";
import { truncate } from "lodash";
import { Box, Text, Link, Button, useModal } from "@advisable/donut";
import Avatar from "../Avatar";
import LineClamp from "../LineClamp";
import TagCloud from "./TagCloud";
import Attributes from "./Attributes";
import SpecialistModal from "./SpecialistModal";
import { StyledSpecialistCard } from "./styles";

const SpecialistCard = ({ specialist, ...props }) => {
  const specialistModal = useModal();

  return (
    <StyledSpecialistCard padding="m" {...props}>
      <Box mb="m">
        <Avatar size="l" name={specialist.name} url={specialist.avatar} />
      </Box>
      <Link.External
        mb="xxs"
        href="#"
        fontSize="l"
        fontWeight="medium"
        letterSpacing="-0.01em"
        onClick={e => {
          e.preventDefault();
          specialistModal.show();
        }}
      >
        {specialist.name}
      </Link.External>
      <Text color="neutral.6" fontSize="xs">
        {truncate(specialist.location, { length: 40 })}
      </Text>
      <Attributes specialist={specialist} />
      <Text fontSize="xxs" lineHeight="xs" color="neutral.6" mb="m">
        <LineClamp maxHeight={100}>{specialist.bio}</LineClamp>
      </Text>
      <TagCloud
        maxRows={2}
        tags={specialist.skills}
        name={specialist.firstName}
      />
      <SpecialistModal modal={specialistModal} specialistId={specialist.id} />
    </StyledSpecialistCard>
  );
};

export default SpecialistCard;

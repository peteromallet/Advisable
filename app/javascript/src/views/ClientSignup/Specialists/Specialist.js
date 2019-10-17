import React from "react";
import { truncate } from "lodash";
import { Box, Text, Button } from "@advisable/donut";
import { StyledSpecialist } from "./styles";
import Avatar from "../../../components/Avatar";
import LineClamp from "../../../components/LineClamp";
import TagCloud from "./TagCloud";
import SpecialistModal from "./SpecialistModal";
import SpecialistAttributes from "./SpecialistAttributes";

const Specialist = ({ specialist, onSelect, isSelected }) => {
  const [viewMore, setViewMore] = React.useState(false);

  return (
    <StyledSpecialist>
      <Box mb="m">
        <Avatar size="l" name={specialist.name} url={specialist.avatar} />
      </Box>
      <Text color="neutral.9" fontSize="l" fontWeight="medium" mb="xxs">
        {specialist.name}
      </Text>
      <Text color="neutral.6" fontSize="xs">
        {truncate(specialist.location, { length: 40 })}
      </Text>
      <SpecialistAttributes specialist={specialist} />
      <Text fontSize="xxs" lineHeight="xs" color="neutral.6" mb="m">
        <LineClamp maxHeight={100}>{specialist.bio}</LineClamp>
      </Text>
      <TagCloud maxRows={2} tags={specialist.skills} />
      <Box position="absolute" bottom={25} left={25} right={25} display="flex">
        <Box width="50%" pr="xxs">
          <Button
            width="100%"
            icon={isSelected ? "check" : "plus"}
            onClick={() => onSelect(specialist.id)}
            appearance={isSelected ? "primary" : "default"}
            intent="success"
          >
            {isSelected ? "Invited" : "Invite"}
          </Button>
        </Box>
        <Box width="50%" pl="xxs">
          <SpecialistModal
            isOpen={viewMore}
            specialistId={specialist.id}
            onClose={() => setViewMore(null)}
          />
          <Button
            width="100%"
            icon="user"
            appearance="outlined"
            onClick={() => setViewMore(true)}
          >
            View
          </Button>
        </Box>
      </Box>
    </StyledSpecialist>
  );
};

export default Specialist;

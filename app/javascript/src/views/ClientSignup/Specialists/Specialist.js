import React from "react";
import { truncate } from "lodash";
import { Box, Text, Button } from "@advisable/donut";
import { StyledSpecialist } from "./styles";
import Avatar from "../../../components/Avatar";
import StarRating from "../../../components/StarRating";
import currency from "../../../utilities/currency";

const Specialist = ({ specialist, onSelect, isSelected }) => {
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
      <Box my="m" display="flex">
        <Box pr="s" borderRight="1px solid" borderColor="neutral.2">
          <Text fontWeight="medium" color="neutral.9" mb="xxs">
            {currency(specialist.hourlyRate, { format: "$0" })}
          </Text>
          <Text fontSize="xxs" color="neutral.5">
            Per Hour
          </Text>
        </Box>
        <Box px="s" borderRight="1px solid" borderColor="neutral.2">
          <Text fontWeight="medium" color="neutral.9" mb="xxs">
            12
          </Text>
          <Text fontSize="xxs" color="neutral.5">
            Projects
          </Text>
        </Box>
        <Box pl="s">
          <StarRating showNumber={false} size="s" rating={4} />
          <Text fontSize="xxs" color="neutral.5">
            4 Reviews
          </Text>
        </Box>
      </Box>
      <Text fontSize="xxs" lineHeight="xs" color="neutral.6">
        {truncate(specialist.bio, { length: 280 })}
      </Text>
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
          <Button width="100%" icon="user" appearance="outlined">
            View
          </Button>
        </Box>
      </Box>
    </StyledSpecialist>
  );
};

export default Specialist;

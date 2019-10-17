import React from "react";
import { Box, Text } from "@advisable/donut";
import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";
import StarRating from "../../../components/StarRating";
import currency from "../../../utilities/currency";
import TagCloud from "./TagCloud";

const SpecialistModal = ({ isOpen, onClose, specialist }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="l">
      <Box padding="l">
        <Box mb="m">
          <Avatar size="l" name={specialist.name} url={specialist.avatar} />
        </Box>
        <Text color="neutral.9" fontSize="l" fontWeight="medium" mb="xxs">
          {specialist.name}
        </Text>
        <Text color="neutral.6" fontSize="xs">
          {specialist.location}
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
            <Text fontSize="xxs" color="neutral.5" mt="1px">
              4 Reviews
            </Text>
          </Box>
        </Box>
        <Text fontSize="xs" lineHeight="s" color="neutral.6" mb="m">
          {specialist.bio}
        </Text>
        <TagCloud tags={specialist.skills} />
      </Box>
    </Modal>
  );
};

export default SpecialistModal;

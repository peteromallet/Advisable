import React from "react";
import { Box, Text } from "@advisable/donut";
import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";
import StarRating from "../../../components/StarRating";
import currency from "../../../utilities/currency";
import TagCloud from "./TagCloud";
import SpecialistAttributes from "./SpecialistAttributes";

const SpecialistModal = ({ isOpen, onClose, specialist }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="l">
      <Box padding="l">
        <Box mb="m">
          <Avatar size="l" name={specialist.name} url={specialist.avatar} />
        </Box>
        <Text color="neutral.9" fontSize="xl" fontWeight="medium" mb="xxs">
          {specialist.name}
        </Text>
        <Text color="neutral.6" fontSize="xs">
          {specialist.location}
        </Text>
        <SpecialistAttributes specialist={specialist} />
        <Text fontSize="xs" lineHeight="s" color="neutral.6" mb="m">
          {specialist.bio}
        </Text>
        <TagCloud tags={specialist.skills} />
      </Box>
    </Modal>
  );
};

export default SpecialistModal;

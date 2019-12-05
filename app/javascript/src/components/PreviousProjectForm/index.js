import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Modal,
  Text,
  Checkbox,
  RoundedButton,
  Icon,
} from "@advisable/donut";
import Select from "../Select";
import StepDots from "../StepDots";
import TextField from "../TextField";

const PreviousProjectForm = ({ modal, previousProject }) => {
  return (
    <Modal modal={modal} padding="l" width={650}>
      <StepDots total={4} current={1} justify="left" mb="xs" />
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue.9"
        fontWeight="semibold"
        letterSpacing="-0.035em"
      >
        Add Previous Project
      </Text>
      <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
        Previous projects are one of the most effective ways to validate your
        skills. Advisable uses them to decide what projects to invite you to.
      </Text>
      <Box mb="m">
        <TextField label="Client Name" placeholder="e.g Acme Corp" />
      </Box>
      <Box mb="m">
        <Select
          label="What type of company is this?"
          options={[
            "Individual Entrepreneur",
            "Small Business",
            "Medium-Sized Business",
            "Startup",
            "Growth-Stage Startup",
            "Major Corporation",
            "Non-Profit",
            "Education Institution",
            "Government",
          ]}
        />
      </Box>
      <Checkbox>
        <Text fontSize="s" fontWeight="medium" color="neutral.9" mb="xxs">
          This client is confidential
        </Text>
        <Text fontSize="xs" lineHeight="xs" color="neutral.6">
          If checked this client’s name will be hidden and then industry will be
          named instead e.g ‘Financial Services Company’
        </Text>
      </Checkbox>
      <Box height={1} bg="neutral.1" my="l" />
      <RoundedButton suffix={<Icon icon="arrow-right" />}>
        Continue
      </RoundedButton>
    </Modal>
  );
};

PreviousProjectForm.propTypes = {};

export default PreviousProjectForm;

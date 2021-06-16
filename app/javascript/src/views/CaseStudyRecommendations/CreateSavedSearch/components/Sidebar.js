import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Text } from "@advisable/donut";
import MultistepMenu from "src/components/MultistepMenu";
import { validationSchema as skillsValidationSchema } from "../steps/Skills";
import { validationSchema as goalsValidationSchema } from "../steps/Goals";

export default function Sidebar({ searchId }) {
  const location = useLocation();
  const skillsComplete = skillsValidationSchema.isValidSync();
  const goalsComplete = goalsValidationSchema.isValidSync();
  const preferencesComplete = location.pathname.includes("review");

  return (
    <Card
      top="0"
      left="0"
      padding={6}
      width="300px"
      height="100vh"
      position="fixed"
      paddingTop="60px"
      borderRadius="0px"
    >
      <Text
        color="neutral400"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="2xs"
        mb={4}
        mt={6}
      >
        Create a Saved Search
      </Text>
      <MultistepMenu>
        <MultistepMenu.Item
          exact
          to={searchId ? `/explore/new/${searchId}/skills` : "/explore/new"}
          isComplete={skillsComplete}
        >
          Skills
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to={`/explore/new/${searchId}/goals`}
          isComplete={goalsComplete}
          isDisabled={!skillsComplete && !goalsComplete}
        >
          Goals
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to={`/explore/new/${searchId}/preferences`}
          isComplete={preferencesComplete}
          isDisabled={!goalsComplete && !preferencesComplete}
        >
          Preferences
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to={`/explore/new/${searchId}/review`}
          isDisabled={!preferencesComplete}
        >
          Review
        </MultistepMenu.Item>
      </MultistepMenu>
    </Card>
  );
}

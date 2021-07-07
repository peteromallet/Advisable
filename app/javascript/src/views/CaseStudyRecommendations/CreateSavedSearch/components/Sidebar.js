import React from "react";
import { useLocation } from "react-router-dom";
import { Text } from "@advisable/donut";
import View from "src/components/View";
import MultistepMenu from "src/components/MultistepMenu";
import { validationSchema as skillsValidationSchema } from "../steps/Skills";
import { validationSchema as goalsValidationSchema } from "../steps/Goals";

export default function Sidebar({ caseStudySearch }) {
  const location = useLocation();
  const skillsComplete = skillsValidationSchema.isValidSync(caseStudySearch);
  const goalsComplete = goalsValidationSchema.isValidSync(caseStudySearch);
  const preferencesComplete = location.pathname.includes("review");

  const searchId = caseStudySearch?.id;

  return (
    <View.Sidebar>
      <Text
        color="neutral400"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="2xs"
        mb={4}
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
    </View.Sidebar>
  );
}

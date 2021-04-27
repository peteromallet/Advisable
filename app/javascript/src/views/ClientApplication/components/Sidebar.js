import React from "react";
import { Card, Text } from "@advisable/donut";
import MultistepMenu from "src/components/MultistepMenu";
import { validationSchema as companyOverviewValidationSchema } from "../steps/CompanyOverview";
import { validationSchema as companyStageValidationSchema } from "../steps/CompanyStage";
import { validationSchema as goalsValidationSchema } from "../steps/Goals";
import { validationSchema as preferencesValidationSchema } from "../steps/Preferences";

export default function Sidebar({ clientApplication }) {
  const companyOverviewComplete = companyOverviewValidationSchema.isValidSync(
    clientApplication,
  );
  const companyStageComplete = companyStageValidationSchema.isValidSync(
    clientApplication,
  );
  const goalsComplete = goalsValidationSchema.isValidSync(clientApplication);
  const preferencesComplete = preferencesValidationSchema.isValidSync(
    clientApplication,
  );

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
        Application
      </Text>
      <MultistepMenu>
        <MultistepMenu.Item
          to="/clients/apply/company-overview"
          isComplete={companyOverviewComplete}
        >
          Company Overview
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to="/clients/apply/company-stage"
          isComplete={companyStageComplete}
          isDisabled={!companyOverviewComplete && !companyStageComplete}
        >
          Company Stage
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to="/clients/apply/goals"
          isComplete={goalsComplete}
          isDisabled={!companyStageComplete && !goalsComplete}
        >
          Goals
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to="/clients/apply/preferences"
          isComplete={preferencesComplete}
          isDisabled={!goalsComplete && !preferencesComplete}
        >
          Preferences
        </MultistepMenu.Item>
      </MultistepMenu>
    </Card>
  );
}

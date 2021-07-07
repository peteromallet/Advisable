import React from "react";
import { Text } from "@advisable/donut";
import View from "src/components/View";
import MultistepMenu from "src/components/MultistepMenu";
import { validationSchema as companyOverviewValidationSchema } from "../steps/CompanyOverview";
import { validationSchema as companyStageValidationSchema } from "../steps/CompanyStage";
import { validationSchema as goalsValidationSchema } from "../steps/Goals";
import { validationSchema as preferencesValidationSchema } from "../steps/Preferences";

export default function Sidebar({ clientApplication }) {
  const companyOverviewComplete =
    companyOverviewValidationSchema.isValidSync(clientApplication);
  const companyStageComplete =
    companyStageValidationSchema.isValidSync(clientApplication);
  const goalsComplete = goalsValidationSchema.isValidSync(clientApplication);
  const preferencesComplete =
    preferencesValidationSchema.isValidSync(clientApplication);

  return (
    <View.Sidebar>
      <Text
        color="neutral400"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="2xs"
        mb={4}
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
    </View.Sidebar>
  );
}

import React from "react";
import { Card, Text } from "@advisable/donut";
import MultistepMenu from "src/components/MultistepMenu";

export default function Sidebar() {
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
          isComplete={false}
        >
          Company Overview
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to="/clients/apply/company-stage"
          isComplete={false}
        >
          Company Stage
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/clients/apply/goals" isComplete={false}>
          Goals
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/clients/apply/preferences" isComplete={false}>
          Preferences
        </MultistepMenu.Item>
      </MultistepMenu>
    </Card>
  );
}

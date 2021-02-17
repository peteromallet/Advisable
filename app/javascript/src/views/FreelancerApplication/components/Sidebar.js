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
        color="neutral500"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="2xs"
        mb={5}
        mt={6}
      >
        Application
      </Text>
      <MultistepMenu>
        <MultistepMenu.Item to="/freelancers/apply/introduction" isComplete>
          Introduction
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/freelancers/apply/overview">
          Overview
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/freelancers/apply/experience" isDisabled>
          Previous work
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/freelancers/apply/preferences" isDisabled>
          Work preferences
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/freelancers/apply/ideal_project" isDisabled>
          Ideal project
        </MultistepMenu.Item>
      </MultistepMenu>
    </Card>
  );
}

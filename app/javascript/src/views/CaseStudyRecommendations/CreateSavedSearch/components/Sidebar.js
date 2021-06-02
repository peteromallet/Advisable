import React from "react";
import { Card, Text } from "@advisable/donut";
import MultistepMenu from "src/components/MultistepMenu";

export default function Sidebar({ id }) {
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
          to={id ? `/explore/new/${id}/skills` : "/explore/new"}
          isComplete={false}
        >
          Skills
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/explore/new/id/goals" isComplete={false}>
          Goals
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/explore/new/id/preferences" isComplete={false}>
          Preferences
        </MultistepMenu.Item>
        <MultistepMenu.Item to="/explore/new/id/review" isComplete={false}>
          Review
        </MultistepMenu.Item>
      </MultistepMenu>
    </Card>
  );
}

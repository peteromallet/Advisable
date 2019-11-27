import React from "react";
import { Card, Text } from "@advisable/donut";

const DeclinedConsultation = ({ data }) => {
  return (
    <Card padding="xl">
      <Text textAlign="center" fontSze="m" lineHeight="s">
        You have declined this consultation request
      </Text>
    </Card>
  );
};

export default DeclinedConsultation;

import React from "react";
import { Card, Text } from "@advisable/donut";
import ChangePasswordForm from "components/ChangePasswordForm";

export default function Password() {
  return (
    <Card padding="2xl">
      <Text
        as="h1"
        fontSize="4xl"
        marginBottom="xl"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Change your password
      </Text>
      <ChangePasswordForm />
    </Card>
  );
}

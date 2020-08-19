import React from "react";
import pluralize from "../../utilities/pluralize";
import AvatarStack from "components/AvatarStack";
import { Box, Card, Text, Stack, Link, Avatar } from "@advisable/donut";

export default function RequestedIntroductions({ accepted }) {
  return (
    <Box
      height="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card width="100%" maxWidth="500px" padding="32px">
        <AvatarStack size="l" marginBottom="m">
          {accepted.map((a) => (
            <Avatar
              key={a.id}
              name={a.specialist.name}
              url={a.specialist.avatar}
            />
          ))}
        </AvatarStack>
        <Text
          fontSize="24px"
          color="neutral900"
          fontWeight="medium"
          marginBottom="12px"
          letterSpacing="-0.04em"
        >
          You have requested{" "}
          {pluralize(accepted.length, "introduction", "introductions")}!
        </Text>
        <Text
          lineHeight="20px"
          marginBottom="xs"
          color="neutral700"
          letterSpacing="-0.02em"
        >
          Looks like you might have found someone you like! We have sent your
          availability to the freelancers you accepted and will let you know
          when they respond.
        </Text>
        <Link marginBottom="xl">View accepted candidates</Link>
        <Text
          lineHeight="20px"
          marginBottom="xs"
          color="neutral700"
          letterSpacing="-0.02em"
        >
          We’ll stop recommending new candidates until after you have spoken
          with these freelancers.
        </Text>
        <Link>I still want to recieve new candidates</Link>
      </Card>
    </Box>
  );
}

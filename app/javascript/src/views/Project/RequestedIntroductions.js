import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import pluralize from "../../utilities/pluralize";
import AvatarStack from "components/AvatarStack";
import { ArrowForward } from "@styled-icons/ionicons-solid";
import { Box, Card, Text, Paragraph, Link, Avatar } from "@advisable/donut";
import { useToggleSourcing } from "./queries";

export default function RequestedIntroductions({ accepted }) {
  const { id } = useParams();

  const [toggleSourcing, { loading }] = useToggleSourcing();

  const handleToggle = async () => {
    await toggleSourcing({
      variables: {
        input: {
          project: id,
        },
      },
    });
  };

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        width="100%"
        maxWidth="540px"
        padding="3xl"
        borderRadius="12px"
        marginTop="-32px"
      >
        <AvatarStack size="l" marginBottom="l">
          {accepted.map((a) => (
            <Avatar
              key={a.id}
              name={a.specialist.name}
              url={a.specialist.avatar}
            />
          ))}
        </AvatarStack>
        <Text
          fontSize="4xl"
          color="neutral900"
          fontWeight="medium"
          marginBottom="xs"
          letterSpacing="-0.02em"
        >
          You have been matched with{" "}
          {pluralize(accepted.length, "candidate", "candidates")}!
        </Text>
        <Paragraph marginBottom="m">
          Looks like you might have found someone you like! We have sent your
          availability to the freelancers you accepted and will let you know
          when they respond.
        </Paragraph>
        <Text marginBottom="2xl">
          <Link to={`/projects/${id}/candidates`}>
            View accepted candidates
            <ArrowForward size="16px" />
          </Link>
        </Text>
        <Text marginBottom="xs" fontWeight="medium">
          Matching has been turned off
        </Text>
        <Paragraph size="sm" marginBottom="xs">
          We’ll stop recommending new candidates until after you have spoken
          with these freelancers.
        </Paragraph>
        <Link onClick={handleToggle}>
          I still want to recieve new candidates
        </Link>
      </Card>
    </Box>
  );
}

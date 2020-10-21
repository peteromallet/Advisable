import React from "react";
import { css } from "styled-components";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import { ArrowLeft, ArrowRight, Edit } from "@styled-icons/feather";
import { Box, Text, Link, Button, Stack } from "@advisable/donut";
import { useUpdateGuildPostWriteCache } from "./mutations";
import { capitalize } from "@guild/utils";
import { GuildBox } from "@guild/styles";
import useProgressSteps from "./useProgressSteps";
import { StyledTopicable } from "./styles";

export default function Review({ guildPost, onPublish }) {
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const { pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const nextPath = `/posts/${guildPost.id}`;

  const handleSubmit = async () => {
    const { data } = await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          publish: true,
        },
      },
    });
    onPublish(data.updateGuildPost.guildPost);
  };

  const guildTopicNames = guildPost?.guildTopics.map((gt) => gt.name);

  const handleContinue = async () => {
    await handleSubmit();
    progress("REVIEW", nextPath);
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%" flexWrap="wrap">
        <Link
          mb="s"
          fontSize="l"
          fontWeight="medium"
          to={pathWithState(`/composer/${guildPost.id}/targeting`)}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Review & Publish
        </Text>
        <Text mb="xl" size="m" lineHeight="l" color="neutral600">
          Please review the details below. Once you are happy with everything we
          will begin searching for the perfect freelancer for you.
        </Text>
        <Stack spacing="2xl">
          <Text size="2xl" fontWeight="medium" color="blue900">
            {guildPost.title}
          </Text>
          <Text
            size="l"
            fontWeight="light"
            color="blue900"
            css={css`
              white-space: pre-wrap;
              white-space: pre-line;
            `}
          >
            {guildPost.body}
          </Text>
        </Stack>

        <GuildBox mt="l">
          <EditButton to={`/composer/${guildPost.id}/edit`} resource="Post" />
          <Box height={1} bg="neutral100" my="l" />
          {guildPost.audienceType !== "none" && (
            <>
              <Stack spacing="l">
                <Text
                  mb="xs"
                  fontSize="l"
                  color="blue900"
                  fontWeight="semibold"
                >
                  {capitalize(guildPost.audienceType)}-Based Targeting
                </Text>
                <GuildBox
                  width="100%"
                  display="flex"
                  flexWrap="wrap"
                  wrapChildrenBoth={8}
                >
                  {guildTopicNames.map((name, key) => (
                    <StyledTopicable key={key}>{name}</StyledTopicable>
                  ))}
                </GuildBox>
                <EditButton
                  to={`/composer/${guildPost.id}/targeting`}
                  resource="Targeting"
                />
              </Stack>
              <Box height={1} bg="neutral100" my="l" />
            </>
          )}
        </GuildBox>

        <Button
          size="l"
          mr="xs"
          onClick={handleContinue}
          suffix={<ArrowRight />}
          disabled={false}
        >
          Publish Post
        </Button>
        <Text
          mt="l"
          size="s"
          fontWeight="light"
          lineHeight="m"
          color="#626575"
          css={"white-space: pre-line;"}
        >
          {
            "By publishing this job you feel like you have completed & submitted something substantial.\nYou should feel like you have committed to something."
          }
        </Text>
      </Box>
    </Box>
  );
}

const EditButton = ({ to, resource }) => {
  const { pathWithState } = useLocationStages();

  return (
    <Button
      size="s"
      as={Link}
      to={pathWithState(to)}
      variant="subtle"
      prefix={<Edit />}
    >
      Edit {resource}
    </Button>
  );
};

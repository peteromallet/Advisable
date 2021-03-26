import React, { useState } from "react";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import { ArrowLeft } from "@styled-icons/feather/ArrowLeft";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Edit } from "@styled-icons/feather/Edit";
import {
  Box,
  Paragraph,
  Text,
  Link,
  Button,
  Stack,
  Checkbox,
} from "@advisable/donut";
import { useUpdateGuildPostWriteCache } from "./mutations";
import { capitalize } from "@guild/utils";
import { GuildBox } from "@guild/styles";
import useProgressSteps from "./useProgressSteps";
import { StyledTopicable } from "./styles";
import { StaticImageTiles } from "./Images";
import Markdown from "../Markdown";

export default function Review({ guildPost, onPublish }) {
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const [shareable, setShareable] = useState(guildPost.shareable);
  const { pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const nextPath = `/posts/${guildPost.id}`;

  const handleSubmit = async () => {
    const { data } = await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          publish: true,
          shareable,
        },
      },
    });
    onPublish && onPublish(data.updateGuildPost.guildPost);
  };

  const guildTopicNames = guildPost?.guildComposerTopics.map((gt) => gt.name);

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
          to={pathWithState(
            `/composer/${guildPost.id}/${
              guildPost.audienceType !== "none" ? "targeting" : "audience"
            }`,
          )}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text mb="xs" fontSize="3xl" color="neutral900" fontWeight="medium">
          Review & Publish
        </Text>
        <Paragraph size="lg">
          Please review the details of your post below before publishing it.
        </Paragraph>
        <Box height="1px" bg="neutral100" marginY="2xl" />
        <Stack spacing="2xl">
          <Text
            size="5xl"
            fontWeight="medium"
            color="neutral900"
            letterSpacing="-0.03rem"
          >
            {guildPost.title}
          </Text>
          <Markdown>{guildPost.body}</Markdown>
        </Stack>

        <Box mt="l">
          <EditButton to={`/composer/${guildPost.id}/post`} resource="Post" />
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
        </Box>

        {!!guildPost.images?.length && (
          <>
            <Stack spacing="l">
              <Text mb="xs" fontSize="l" color="blue900" fontWeight="semibold">
                Images
              </Text>
              <StaticImageTiles images={guildPost.images} />
              <EditButton
                to={`/composer/${guildPost.id}/images`}
                resource="Images"
              />
            </Stack>
            <Box height={1} bg="neutral100" my="l" />
          </>
        )}

        <Box paddingBottom="l">
          <Checkbox
            name="shareable"
            checked={shareable}
            onChange={() => setShareable(!shareable)}
          >
            Make this post public
          </Checkbox>
          <Text
            mt="s"
            size="xs"
            fontWeight="light"
            lineHeight="s"
            color="#626575"
          >
            Allow this post to be shared publicly to non guild members
          </Text>
        </Box>

        <Button
          size="l"
          mr="xs"
          onClick={handleContinue}
          suffix={<ArrowRight />}
          disabled={false}
        >
          {guildPost.status === "published" ? "Save Changes" : "Publish Post"}
        </Button>
        <Text mt="l" size="s" fontWeight="light" lineHeight="m" color="#626575">
          By publishing this post you are aggreeing to the Advisable Guild code
          of conduct and community guidelines.
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

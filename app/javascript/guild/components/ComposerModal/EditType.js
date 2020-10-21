import React, { createElement, useState } from "react";
import { useUpdateGuildPostWriteCache } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Box, Text, Link, Button } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { Question, Feedback, Group, BookOpen } from "@guild/icons";
import { ComposerBoxOption } from "./styles";

/*
  Edits the Post Type.  Defaults to "General" if skipped
*/
export default function EditType({ guildPost }) {
  const [postType, setPostType] = useState(guildPost.denormalizedType);
  const { pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const nextPath = `/composer/${guildPost.id}/audience`;

  const handleContinue = () => {
    progress("EDIT_TYPE", nextPath);
  };

  const handleUpdate = async (type) => {
    setPostType(type);
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          type,
        },
      },
    });
  };

  const postTypes = [
    {
      type: "AdviceRequired",
      desc: "Request For Advice",
      icon: Feedback,
    },
    {
      type: "Opportunity",
      desc: "Opportunity For Others",
      icon: Group,
    },
    {
      type: "CaseStudy",
      desc: "Case Study To Share",
      icon: BookOpen,
    },
    {
      type: "Post",
      desc: "Not Sure",
      icon: Question,
    },
  ];

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Link
          mb="s"
          fontSize="l"
          fontWeight="medium"
          to={pathWithState(`/composer/${guildPost.id}/images`)}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Type of Post
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          Please add the type of post that this is - this should be the purpose
          of your post.
        </Text>
        <GuildBox flexWrap="wrap" wrapChildrenBoth={16}>
          {postTypes.map(({ type, desc, icon }, key) => (
            <ComposerBoxOption
              key={key}
              spacing="2xl"
              selected={type === postType}
              onClick={() => handleUpdate(type)}
            >
              <GuildBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                spaceChildrenVertical={16}
              >
                {createElement(icon, { size: 24 })}
                <Text>{desc}</Text>
              </GuildBox>
            </ComposerBoxOption>
          ))}
        </GuildBox>

        <GuildBox mt="xl">
          <Button
            size="l"
            mr="xs"
            onClick={handleContinue}
            suffix={<ArrowRight />}
          >
            Continue
          </Button>
        </GuildBox>
      </Box>
    </Box>
  );
}

import React, { createElement, useState } from "react";
import { useUpdateGuildPostWriteCache } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Box, Text, Link, Button } from "@advisable/donut";
import { ComposerBoxOption } from "./styles";
import { GuildBox } from "@guild/styles";
import { Question, Building, FileList, MapPinUser } from "@guild/icons";

/*
  Edits the Post Audience type.
    This is necessary to determine the 'type' of guild topicable that can be added in the next step
*/

export default function EditAudience({ guildPost }) {
  const [audienceType, setAudienceType] = useState(guildPost?.audienceType);
  const { navigate, pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const nextPath = `/composer/${guildPost.id}/targeting`;

  const handleContinue = () => {
    progress("EDIT_AUDIENCE");
    navigate(nextPath);
  };
  const handleUpdate = async (type) => {
    setAudienceType(type);
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          audienceType: type,
        },
      },
    });
  };

  const audienceTypes = [
    { type: "skills", desc: "People With A Specific Skill", icon: FileList },
    {
      type: "industries",
      desc: "People In A Certain Industry",
      icon: Building,
    },
    {
      type: "locations",
      desc: "People In a Specific Location",
      icon: MapPinUser,
    },
    { type: "none", desc: "Not sure", icon: Question },
  ];

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Link
          mb="s"
          fontSize="l"
          fontWeight="medium"
          to={pathWithState(`/composer/${guildPost.id}/post_type`)}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Type of Targeting
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          What kind of audience would you like to reach with this post - we’ll
          make sure it reaches the right people.
        </Text>

        <GuildBox flexWrap="wrap" wrapChildrenBoth={16}>
          {audienceTypes.map(({ type, desc, icon }, key) => (
            <ComposerBoxOption
              key={key}
              spacing="2xl"
              selected={type === audienceType}
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
            disabled={!audienceType}
            suffix={<ArrowRight />}
          >
            Continue
          </Button>
        </GuildBox>
      </Box>
    </Box>
  );
}

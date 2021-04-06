import React from "react";
import MultistepMenu from "@advisable-main/components/MultistepMenu";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { yourPostValidationSchema } from "./validationSchemas";

const NavigationMenu = ({ guildPost, postPrompt }) => {
  const urlPrefix = ["/composer", guildPost?.id].filter(Boolean).join("/");
  return (
    <SetupMenu
      guildPost={guildPost}
      urlPrefix={urlPrefix}
      postPrompt={postPrompt}
    />
  );
};

const SetupMenu = React.memo(function SetupMenu({
  postPrompt,
  guildPost,
  urlPrefix,
}) {
  const isPublished = guildPost?.status === "published";
  const { progressed } = useProgressSteps();
  const { pathWithState } = useLocationStages();

  const yourPostComplete = yourPostValidationSchema.isValidSync(guildPost);

  const editImagesComplete =
    isPublished ||
    progressed("EDIT_IMAGES") ||
    Boolean(guildPost?.images?.length);

  const audienceComplete =
    isPublished ||
    guildPost?.audienceType?.length ||
    progressed("EDIT_AUDIENCE");

  const targetingComplete =
    isPublished ||
    progressed("EDIT_TARGETING") ||
    guildPost?.guildComposerTopics?.length ||
    guildPost?.audienceType === "none";

  return (
    <MultistepMenu>
      {!postPrompt && !guildPost?.postPrompt && (
        <MultistepMenu.Item
          to={`${urlPrefix}/type`}
          isComplete={Boolean(guildPost)}
          isDisabled={!guildPost}
        >
          Post Type
        </MultistepMenu.Item>
      )}

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/post`)}
        isComplete={yourPostComplete}
        isDisabled={!guildPost}
      >
        Your Post
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/images`)}
        isComplete={editImagesComplete}
        isDisabled={!yourPostComplete}
      >
        Images
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/audience`)}
        isComplete={audienceComplete}
        isDisabled={!editImagesComplete}
      >
        Audience
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/targeting`)}
        isComplete={targetingComplete}
        isDisabled={!audienceComplete}
      >
        Targeting
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/review`)}
        isDisabled={!targetingComplete}
      >
        Review & Publish
      </MultistepMenu.Item>
    </MultistepMenu>
  );
});

export default NavigationMenu;

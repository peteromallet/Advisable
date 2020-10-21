import React from "react";
import MultistepMenu from "@advisable-main/components/MultistepMenu";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { yourPostValidationSchema } from "./validationSchemas";

const NavigationMenu = ({ guildPost }) => {
  const urlPrefix = ["/composer", guildPost?.id].filter(Boolean).join("/");
  return <SetupMenu guildPost={guildPost} urlPrefix={urlPrefix} />;
};

const SetupMenu = React.memo(function SetupMenu({ guildPost, urlPrefix }) {
  const isPublished = guildPost?.status === "published";
  const { progressed } = useProgressSteps();
  const { pathWithState } = useLocationStages();

  const yourPostComplete = yourPostValidationSchema.isValidSync(guildPost);

  const editImagesComplete =
    isPublished || progressed("EDIT_IMAGES") || guildPost?.images?.length;

  const postTypeComplete = isPublished || progressed("EDIT_TYPE");

  const audienceComplete =
    isPublished ||
    guildPost?.audienceType?.length ||
    progressed("EDIT_AUDIENCE");

  const targetingComplete =
    isPublished ||
    progressed("EDIT_TARGETING") ||
    guildPost?.guildTopics?.length ||
    guildPost?.audienceType === "none";

  return (
    <MultistepMenu>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/${guildPost?.id ? "edit" : "new"}`)}
        isComplete={yourPostComplete}
      >
        Your Post
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/images`)}
        isComplete={editImagesComplete}
        isDisabled={!editImagesComplete}
      >
        Images
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/post_type`)}
        isComplete={postTypeComplete}
        isDisabled={!postTypeComplete}
      >
        Post Type
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/audience`)}
        isComplete={audienceComplete}
        isDisabled={!audienceComplete}
      >
        Audience
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/targeting`)}
        isComplete={targetingComplete}
        isDisabled={!targetingComplete}
      >
        Targeting
      </MultistepMenu.Item>

      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/review`)}
        isDisabled={true}
      >
        Review & Publish
      </MultistepMenu.Item>
    </MultistepMenu>
  );
});

export default NavigationMenu;

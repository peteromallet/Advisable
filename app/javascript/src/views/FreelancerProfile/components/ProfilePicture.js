import React from "react";
import { matchPath, useParams } from "react-router";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import { Box } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import FileUpload from "./FileUpload";
import { useUpdateProfile } from "../queries";
import useLoadImage from "src/hooks/useLoadImage";

function ArticleProfilePicture({ specialist }) {
  return (
    <Box marginTop={18} marginBottom={4} display="inline-block">
      <PassportAvatar
        size={"lg"}
        name={specialist.name}
        src={specialist.avatar}
        stroke={"2px"}
      />
    </Box>
  );
}

export default function ProfilePicture({ specialist }) {
  const [updateAvatar] = useUpdateProfile();
  const { updated } = useLoadImage(specialist.avatar);
  const notifications = useNotifications();
  const params = useParams();
  const viewer = useViewer();
  const isOwner = viewer?.id === params.id;

  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });

  const submit = async (blob) => {
    await updateAvatar({
      variables: { input: { avatar: blob.signed_id } },
    });
    notifications.notify("Profile picture has been updated");
  };

  return isArticle ? (
    <ArticleProfilePicture specialist={specialist} />
  ) : (
    <Box position="absolute" left="0" bottom="0" display="inline-block">
      <PassportAvatar
        size={["lg", "lg", "xl", "xl", "2xl"]}
        name={specialist.name}
        src={specialist.avatar}
        stroke="4px"
      />
      {isOwner && (
        <FileUpload
          onChange={submit}
          updated={updated}
          maxSizeInMB={1}
          type="avatar"
        />
      )}
    </Box>
  );
}

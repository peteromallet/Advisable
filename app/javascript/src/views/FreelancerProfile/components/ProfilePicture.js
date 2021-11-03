import React from "react";
import { useDialogState } from "reakit/Dialog";
import { useParams } from "react-router";
import { Box } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import PassportAvatar from "src/components/PassportAvatar";
import useFileUpload from "../hooks/useFileUpload";
import PictureActionArea from "./PictureActionArea";
import FileUploadInput from "./FileUploadInput";
import ProgressBar from "./ProgressBar";
import { useUpdateProfile } from "../queries";
import ImageModal from "./ImageModal";

export default function ProfilePicture({ specialist }) {
  const accept = ".png, .jpg, .jpeg";
  const [updateAvatar] = useUpdateProfile();
  const notifications = useNotifications();
  const params = useParams();
  const viewer = useViewer();
  const isOwner = viewer?.id === params.id;
  const modal = useDialogState();

  const submit = async (blob) => {
    const response = await updateAvatar({
      variables: { input: { avatar: blob.signed_id } },
    });
    if (response.errors) {
      notifications.error("Something went wrong. Please try again.");
    } else {
      notifications.notify("Profile picture has been updated");
    }
  };

  const { handleChange, progress, uploading, processing, updated } =
    useFileUpload({
      src: specialist.avatar,
      onChange: submit,
      maxSizeInMB: 1,
      accept,
    });

  return (
    <Box position="absolute" left="0" bottom="0" display="inline-block">
      <PassportAvatar
        size={["lg", "lg", "xl", "xl", "2xl"]}
        name={specialist.name}
        src={specialist.avatar}
        stroke="4px"
      />
      <ImageModal modal={modal}>
        <PassportAvatar
          size="responsive"
          name={specialist.name}
          src={specialist.avatar}
        />
      </ImageModal>
      <PictureActionArea
        type="avatar"
        onClick={specialist.avatar && modal.show}
      />
      {isOwner && (
        <>
          <FileUploadInput
            handleChange={handleChange}
            accept={accept}
            maxSizeInMB={1}
            type="avatar"
          />
          <ProgressBar
            progress={progress}
            uploading={uploading}
            processing={processing}
            updated={updated}
            type="avatar"
          />
        </>
      )}
    </Box>
  );
}

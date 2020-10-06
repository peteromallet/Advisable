import React from "react";
import FileUpload from "./FileUpload";
import { CoverImageWrapper, StyledCoverImage } from "./styles";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import useImageOnLoad from "src/hooks/useImageOnLoad";
import { SET_COVER_PHOTO } from "../../queries";

function CoverImage({ coverPhoto, isOwner }) {
  const [updatePicture] = useMutation(SET_COVER_PHOTO);
  const loaded = useImageOnLoad(coverPhoto);
  const notifications = useNotifications();

  const submit = async (blob) => {
    await updatePicture({
      variables: { input: { blob: blob.signed_id } },
    });

    notifications.notify("Cover picture has been updated");
  };

  return (
    <CoverImageWrapper>
      {isOwner && <FileUpload onChange={submit} />}
      {coverPhoto && <StyledCoverImage src={coverPhoto} loaded={loaded} />}
    </CoverImageWrapper>
  );
}

export default CoverImage;

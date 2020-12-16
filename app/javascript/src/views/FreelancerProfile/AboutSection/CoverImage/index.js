import React from "react";
import FileUpload from "../FileUpload";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import useImageOnLoad from "src/hooks/useImageOnLoad";
import { SET_COVER_PHOTO } from "../../queries";
import defaultCoverPhoto from "./defaultCoverPhoto.png";
import { CoverImageWrapper, StyledCoverImage } from "./styles";

function CoverImage({ coverPhoto, isOwner }) {
  const [updatePicture] = useMutation(SET_COVER_PHOTO);
  const image = coverPhoto || defaultCoverPhoto;
  const { loaded, updated } = useImageOnLoad(image);

  const notifications = useNotifications();

  const submit = async (blob) => {
    await updatePicture({
      variables: { input: { blob: blob.signed_id } },
    });

    notifications.notify("Cover picture has been updated");
  };

  return (
    <CoverImageWrapper id="cover-img-wrapper">
      {isOwner && <FileUpload onChange={submit} updated={updated} />}
      <StyledCoverImage src={image} loaded={loaded} />
    </CoverImageWrapper>
  );
}

export default CoverImage;

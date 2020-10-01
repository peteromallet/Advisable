import React from "react";
import { Box } from "@advisable/donut";
import FileUpload from "./FileUpload";
import { CoverImageWrapper } from "./styles";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import useImageOnLoad from "src/hooks/useImageOnLoad";
import { SET_COVER_PHOTO } from "../../queries";

function CoverImage({ coverPhoto, isOwner }) {
  const [updatePicture] = useMutation(SET_COVER_PHOTO);
  const loaded = useImageOnLoad(coverPhoto);
  const notifications = useNotifications();

  const submit = async (blob) => {
    console.log("blob", blob);
    await updatePicture({
      variables: { input: { blob: blob.signed_id } },
    });

    notifications.notify("Cover picture has been updated");
  };

  const defaultPicture =
    "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/92b19080680791.5ce7e63751fcd.jpg";

  return (
    <CoverImageWrapper>
      {isOwner && <FileUpload onChange={submit} />}
      <Box
        as="img"
        src={coverPhoto || defaultPicture}
        css={`
          object-fit: cover;
        `}
        styles={{ visibility: loaded ? "visible" : "hidden" }}
        width="100%"
        bg="neutral50"
        height="300px"
        mx="auto"
        borderRadius={12}
      />
    </CoverImageWrapper>
  );
}

export default CoverImage;

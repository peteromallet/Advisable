import React from "react";
import { matchPath, useParams } from "react-router";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import { StyledCover, StyledCoverImage, StyledContentWrapper } from "./styles";
import defaultCoverPhoto from "./defaultCoverPhoto.png";
import FileUpload from "../FileUpload";
import { useSetCoverPhoto } from "../../queries";
import useLoadImage from "src/hooks/useLoadImage";

function CoverImage({ src, ...props }) {
  const params = useParams();
  const viewer = useViewer();
  const isOwner = viewer?.id === params.id;

  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });
  const [updatePicture] = useSetCoverPhoto();
  const image = src || defaultCoverPhoto;
  const { isLoading, updated, error } = useLoadImage(image);

  const notifications = useNotifications();

  const submit = async (blob) => {
    await updatePicture({
      variables: { input: { blob: blob.signed_id } },
    });

    notifications.notify("Cover picture has been updated");
  };

  return (
    <StyledCover {...props}>
      <svg className="svgClip" width={0} height={0} viewBox="0 0 1080 320">
        <clipPath
          id="coverSquircle"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.000925925925926 0.003125)"
        >
          <path d="M0 41.28c0-16.168 0-24.253 3.736-30.14a24 24 0 017.404-7.404C17.027 0 25.112 0 41.28 0h997.44c16.17 0 24.25 0 30.14 3.736a23.986 23.986 0 017.4 7.404c3.74 5.887 3.74 13.972 3.74 30.14v237.44c0 16.168 0 24.253-3.74 30.14a23.985 23.985 0 01-7.4 7.404c-5.89 3.736-13.97 3.736-30.14 3.736H41.28c-16.168 0-24.253 0-30.14-3.736a23.998 23.998 0 01-7.404-7.404C0 302.973 0 294.888 0 278.72V41.28z" />
        </clipPath>
      </svg>
      <StyledContentWrapper>
        <StyledCoverImage
          isLoading={isLoading}
          src={error ? defaultCoverPhoto : image}
        />
        {isOwner && !isArticle ? (
          <FileUpload
            onChange={submit}
            updated={updated}
            maxSizeInMB={5}
            type="cover"
          />
        ) : null}
      </StyledContentWrapper>
    </StyledCover>
  );
}

CoverImage.defaultProps = {
  size: "md",
  color: "blue",
};

export default CoverImage;

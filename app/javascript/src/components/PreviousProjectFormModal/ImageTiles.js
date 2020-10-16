import { useRef, useState, useEffect, memo } from "react";
import { gql } from "@apollo/client";
import { find } from "lodash-es";
import { rgba } from "polished";
import { X, Plus } from "@styled-icons/feather";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import { useMutation, useApolloClient } from "@apollo/client";
import { DirectUpload } from "@rails/activestorage";
import {
  GET_PREVIOUS_PROJECT,
  useUpdatePreviousProjectImage,
  useDeletePreviousProjectImage,
} from "./queries";

const StyledImageTiles = styled.div`
  width: 100%;
  display: grid;
  row-gap: 12px;
  column-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StyledImageTileProgress = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  border-radius: 8px;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${rgba(theme.colors.neutral100, 0.85)};
`;

const StyledImageTileProgressBar = styled.div`
  width: 70%;
  height: 4px;
  position: relative;
  border-radius: 2px;
  background: white;

  &::after {
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 2px;
    position: absolute;
    transition: width 100ms;
    width: ${(p) => p.percentage}%;
    background: ${theme.colors.neutral900};
  }
`;

export const StyledRemovePhotoButton = styled.button`
  width: 24px;
  height: 24px;
  top: -12px;
  right: -12px;
  appearance: none;
  position: absolute;
  border-radius: 50%;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.blue900};

  opacity: 0;
  transform: scale(0);
  transition: opacity 200ms, transform 200ms;
`;

const coverPhotoTile = css`
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px ${theme.colors.blue600};
`;

const StyledImageTile = styled.div`
  height: 100px;
  border-radius: 8px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: url(${(p) => p.image});
  background-color: ${theme.colors.neutral100};
  ${(p) => p.isCover && coverPhotoTile};

  &:hover ${StyledRemovePhotoButton} {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledNewImageTile = styled.div`
  height: 100px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral300};
  background: ${theme.colors.neutral50};
  border: 2px dashed ${theme.colors.neutral100};

  &:hover {
    color: ${theme.colors.neutral400};
    border-color: ${theme.colors.neutral300};
  }

  input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    position: absolute;
  }
`;

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

function useUpload(file, config = {}) {
  const preview = useRef(null);
  const configuration = useRef(config);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    configuration.current = config;
  }, [config]);

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setPercentage(p);
      });
    },
  };

  function success(blob) {
    configuration.current.onSuccess(blob);
  }

  useEffect(() => {
    const upload = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    upload.create((error, blob) => {
      if (error) {
        console.log("error", error);
      } else {
        success(blob);
      }
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.current = e.target.result;
    };

    reader.readAsDataURL(file);
  }, []);

  return { percentage, preview: preview.current };
}

const CREATE_PHOTO = gql`
  mutation createPhoto($input: CreatePreviousProjectImageInput!) {
    createPreviousProjectImage(input: $input) {
      image {
        id
        url
        cover
      }
    }
  }
`;

function Upload({ previousProjectId, image, dispatch, onClick }) {
  const [createImage] = useMutation(CREATE_PHOTO, {
    update(client, { data }) {
      const prev = client.readQuery({
        query: GET_PREVIOUS_PROJECT,
        variables: { id: previousProjectId },
      });

      client.writeQuery({
        query: GET_PREVIOUS_PROJECT,
        variables: { id: previousProjectId },
        data: {
          previousProject: {
            ...prev.previousProject,
            images: [
              ...prev.previousProject.images,
              data.createPreviousProjectImage.image,
            ],
          },
        },
      });
    },
  });

  const upload = useUpload(image.file, {
    cover: image.cover,
    onSuccess: async (blob) => {
      const r = await createImage({
        variables: {
          input: {
            id: image.id,
            previousProject: previousProjectId,
            attachment: blob.signed_id,
            cover: image.cover,
            position: image.position,
          },
        },
      });

      const newImage = r.data.createPreviousProjectImage.image;

      dispatch({
        type: "UPLOAD_FINISHED",
        image: newImage,
      });
    },
  });

  return (
    <StyledImageTile
      image={upload.preview}
      isCover={image.cover}
      onClick={onClick}
      data-uploading
    >
      <StyledImageTileProgress>
        <StyledImageTileProgressBar percentage={upload.percentage} />
      </StyledImageTileProgress>
    </StyledImageTile>
  );
}

const PortfolioImage = memo(function PortfolioImage({
  image,
  onClick,
  dispatch,
}) {
  const [setAsCover] = useUpdatePreviousProjectImage();
  const [deleteImage] = useDeletePreviousProjectImage();

  const handleClick = () => {
    if (image.cover) return;

    setAsCover({
      variables: {
        input: {
          previousProjectImage: image.id,
          cover: true,
        },
      },
    });

    onClick();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    deleteImage({
      variables: {
        input: {
          previousProjectImage: image.id,
        },
      },
    });
    dispatch({
      type: "REMOVE_IMAGE",
      id: image.id,
    });
  };

  return (
    <StyledImageTile
      image={image.url}
      isCover={image.cover}
      onClick={handleClick}
    >
      <StyledRemovePhotoButton aria-label="Remove image" onClick={handleRemove}>
        <X size={16} strokeWidth={2} />
      </StyledRemovePhotoButton>
    </StyledImageTile>
  );
});

function ImageTiles({ images, dispatch, previousProjectId }) {
  const client = useApolloClient();
  const cover = find(images, { cover: true });

  const handleSetCover = (image) => () => {
    if (image.cover) return;

    dispatch({
      type: "SET_COVER",
      id: image.id,
    });

    // Unset the existing cover photo in the graphql cache
    if (cover) {
      client.writeFragment({
        id: `PreviousProjectImage:${cover.id}`,
        fragment: gql`
          fragment image on PreviousProjectImage {
            cover
          }
        `,
        data: {
          __typename: "PreviousProjectImage",
          cover: false,
        },
      });
    }
  };

  const tiles = images.map((image) => {
    if (image.uploading) {
      return (
        <Upload
          key={image.id}
          image={image}
          dispatch={dispatch}
          previousProjectId={previousProjectId}
          onClick={handleSetCover(image)}
        />
      );
    }

    return (
      <PortfolioImage
        key={image.id}
        image={image}
        dispatch={dispatch}
        onClick={handleSetCover(image)}
      />
    );
  });

  const handleChange = (e) => {
    const cover = find(images, { cover: true });
    Array.from(e.target.files).forEach((file, i) => {
      dispatch({
        type: "NEW_UPLOAD",
        file,
        cover: !cover && i === 0,
        position: images.length + (i + 1),
      });
    });
  };

  return (
    <StyledImageTiles>
      {tiles}
      <StyledNewImageTile>
        <Plus size={24} strokeWidth={2} />
        <input
          type="file"
          name="upload-image"
          multiple
          onChange={handleChange}
        />
      </StyledNewImageTile>
    </StyledImageTiles>
  );
}

export default ImageTiles;

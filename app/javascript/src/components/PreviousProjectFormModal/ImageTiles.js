import React, { useCallback } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { rgba } from "polished";
import { Plus } from "@styled-icons/feather/Plus";
import { X } from "@styled-icons/feather/X";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import { useDeletePreviousProjectImage } from "./queries";
import matchFileType from "src/utilities/matchFileType";
import useUpload from "./useUpload";
import { previousProjectImageFields } from "./queries";

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
  background-image: url("${(p) => p.image}");
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

const CREATE_PHOTO = gql`
  mutation createPhoto($input: CreatePreviousProjectImageInput!) {
    createPreviousProjectImage(input: $input) {
      image {
        id
        url
        cover
        signedId
        position
      }
    }
  }
`;

const SET_COVER = gql`
  mutation setCoverPhoto($input: SetPreviousProjectCoverImageInput!) {
    setPreviousProjectCoverImage(input: $input) {
      image {
        id
        url
        cover
        signedId
        position
      }
    }
  }
`;

function Upload({ previousProject, image, finishUpload, onClick }) {
  const client = useApolloClient();
  const [createImage] = useMutation(CREATE_PHOTO);

  const upload = useUpload(image.file, {
    onSuccess: async (blob) => {
      const r = await createImage({
        variables: {
          input: {
            cover: image.cover,
            position: image.position,
            previousProject: previousProject.id,
            attachment: blob.signed_id,
          },
        },
      });

      const newImage = r.data.createPreviousProjectImage.image;

      client.cache.modify({
        id: client.cache.identify(previousProject),
        fields: {
          images(existing = [], { readField }) {
            const newRef = client.cache.writeFragment({
              fragment: previousProjectImageFields,
              data: newImage,
            });

            if (existing.some((ref) => readField("id", ref) === newRef.id)) {
              return existing;
            }

            return [...existing, newRef];
          },
        },
      });

      finishUpload(image.key, newImage);
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

const PortfolioImage = React.memo(function PortfolioImage({
  image,
  onClick,
  onRemove,
}) {
  const handleClick = () => {
    if (image.cover) return;

    onClick();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(image);
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

function ImageTiles({
  state: images,
  previousProject,
  remove,
  setCover,
  addUpload,
  finishUpload,
}) {
  const client = useApolloClient();
  const [setCoverImage] = useMutation(SET_COVER);
  const [deleteImage] = useDeletePreviousProjectImage();
  const { error } = useNotifications();
  const accept = ".png, .jpg, .jpeg";

  const updateCoverInCache = useCallback(
    (image) => {
      client.cache.modify({
        id: client.cache.identify(image),
        fields: {
          cover: () => true,
        },
      });

      client.cache.modify({
        id: client.cache.identify(previousProject),
        fields: {
          coverPhoto() {
            const newRef = client.cache.writeFragment({
              fragment: previousProjectImageFields,
              data: image,
            });

            return newRef;
          },
        },
      });
    },
    [client.cache, previousProject],
  );

  const handleSetCover = (image) => () => {
    if (image.cover) return;
    setCover(image);

    if (image.id) {
      setCoverImage({
        variables: {
          input: {
            previousProject: previousProject.id,
            attachment: image.signedId,
          },
        },
      });

      updateCoverInCache(image);
    }
  };

  const handleRemoveImage = useCallback(
    (image) => {
      if (image.id) {
        const fields = {
          images(existingRefs, { readField }) {
            return existingRefs.filter((imageRef) => {
              return image.id != readField("id", imageRef);
            });
          },
        };

        client.cache.modify({
          id: client.cache.identify(previousProject),
          fields,
        });

        remove(image);

        deleteImage({
          variables: {
            input: {
              id: image.id,
            },
          },
        });

        if (image.cover) {
          const nextCover = images.filter((i) => i.id !== image.id)[0];
          updateCoverInCache(nextCover);
        }
      }
    },
    [client, remove, deleteImage, previousProject, updateCoverInCache, images],
  );

  const tiles = images.map((image) => {
    if (image.uploading) {
      return (
        <Upload
          key={image.key}
          image={image}
          finishUpload={finishUpload}
          previousProject={previousProject}
          onClick={handleSetCover(image)}
        />
      );
    }

    return (
      <PortfolioImage
        key={image.key}
        image={image}
        onRemove={handleRemoveImage}
        onClick={handleSetCover(image)}
      />
    );
  });

  const handleChange = (e) => {
    if (!e.target?.value) return false;
    const files = Array.from(e.target.files);

    // Check file type
    if (!matchFileType(files, accept)) {
      error(`Please select one of the following file types: ${accept}`);
      return false;
    }
    // Check file size
    const MAX_SIZE_IN_MB = 5;
    if (filesExceedLimit(files, MAX_SIZE_IN_MB)) {
      error(`File size cannot exceed ${MAX_SIZE_IN_MB} MB`);
      return false;
    }

    files.forEach(addUpload);
  };

  return (
    <StyledImageTiles>
      {tiles}
      <StyledNewImageTile>
        <Plus size={24} strokeWidth={2} />
        <input
          type="file"
          name="upload-image"
          accept={accept}
          onChange={handleChange}
          multiple
        />
      </StyledNewImageTile>
    </StyledImageTiles>
  );
}

export default ImageTiles;

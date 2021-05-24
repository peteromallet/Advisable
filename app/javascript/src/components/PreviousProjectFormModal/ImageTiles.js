import React, { useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import { Plus } from "@styled-icons/feather/Plus";
import { X } from "@styled-icons/feather/X";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import { useDeletePreviousProjectImage } from "./queries";
import matchFileType from "src/utilities/matchFileType";
import useUpload from "./useUpload";
import { previousProjectImageFields, CREATE_PHOTO, SET_COVER } from "./queries";
import {
  StyledImageTiles,
  StyledImageTileProgress,
  StyledImageTileProgressBar,
  StyledRemovePhotoButton,
  StyledImageTile,
  StyledNewImageTile,
} from "./styles";

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
      const existingCover = previousProject.coverPhoto;
      if (existingCover) {
        client.cache.modify({
          id: client.cache.identify(existingCover),
          fields: {
            cover: () => false,
          },
        });
      }

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
        client.cache.modify({
          id: client.cache.identify(previousProject),
          fields: {
            images(existingRefs, { readField }) {
              return existingRefs.filter((imageRef) => {
                return image.id != readField("id", imageRef);
              });
            },
          },
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
          if (nextCover) {
            updateCoverInCache(nextCover);
          }
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

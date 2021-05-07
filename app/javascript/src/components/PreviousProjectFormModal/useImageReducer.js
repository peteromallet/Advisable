import { useReducer } from "react";
import generateID from "src/utilities/generateID";

function attributesFromAttachment(attachment) {
  return {
    key: generateID("ppi"),
    uploading: false,
    id: attachment.id,
    url: attachment.url,
    cover: attachment.cover,
    signedId: attachment.signedId,
  };
}

function initializeState(attachments) {
  return attachments.map((attachment) => {
    return attributesFromAttachment(attachment);
  });
}

// We manage all of the photos inside of a state reducer. This is to make the UX when managing
// images a little better. e.g Allow users to change cover photos before the photos finish
// uploading. This state is an array of objects with the following attributes:
// - id: The previous project image UID. When a file is uploaded, this is generated on the
//       client side which allows to easily update the graphql cache once the upload completes
//       and the record is saved.
// - url: The url for the image. This will be null for images that are uploading.
// - file: The original file for the image. This will only be set for images that have just been
// .       uploaded and will be null for any images that are returned from the API on initial load.
// - uploading: Whether or not the image is currently uploading.
// - cover: Whether or not the image is the cover photo.
function reducer(state, action) {
  switch (action.type) {
    case "NEW_UPLOAD": {
      return [
        ...state,
        {
          key: generateID("ppi"),
          uploading: true,
          file: action.file,
          cover: action.cover,
        },
      ];
    }

    case "UPLOAD_FINISHED": {
      return state.map((image) => {
        if (image.key === action.key) {
          return {
            ...image,
            ...attributesFromAttachment(action.image),
          };
        }

        return image;
      });
    }

    case "REMOVE_IMAGE": {
      const image = state.find((i) => i.key === action.key);
      const isCover = image?.cover || false;

      const nextState = state.filter((i) => i.key !== image.key);

      if (isCover && nextState[0]) {
        nextState[0].cover = true;
      }

      return nextState;
    }

    case "SET_COVER": {
      const cover = state.find((i) => i.cover);

      return state.map((image) => {
        if (image.key === action.key) {
          return { ...image, cover: true };
        }

        if (image.key === cover?.key) {
          return { ...image, cover: false };
        }

        return image;
      });
    }
  }
}

function useImageReducer(images) {
  const initState = initializeState(images);
  return useReducer(reducer, initState);
}

export default useImageReducer;

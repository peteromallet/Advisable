import { useReducer } from "react";
import { find } from "lodash-es";
import generateID from "../../utilities/generateID";

// We manage all of the photos inside of a state reducer. This is to make the UX when managing
// images a little better. e.g Allow users to change cover photos before the photos finish
// uploading. This state is an array of objects with the following attributes:
// - id: The previous project image UID. When a file is uploaded, this is generated on the
//       client side which allows to easily update the graphql cache once the upload completes
//       and the record is saved.
// - url: The url for the image. This will be null for images that are uploading.
// - file: The original file for the image. This will only be set for images that have just been
// .       uploaded and will be null for any images that are returned from the API on initial load.
// - uploading: Wether or not the image is currently uploading.
// - cover: Wether or not the image is the cover photo.
function reducer(state, action) {
  switch (action.type) {
    case "NEW_UPLOAD": {
      return [
        ...state,
        {
          id: generateID("ppi"),
          uploading: true,
          file: action.file,
          cover: action.cover,
          position: action.position,
        },
      ];
    }

    case "UPLOAD_FINISHED": {
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {
            ...image,
            ...action.image,
            uploading: false,
          };
        }

        return image;
      });
    }

    case "REMOVE_IMAGE": {
      const isCover = find(state, { id: action.id })?.cover || false;

      let nextState = state.filter((img) => img.id !== action.id);

      if (isCover) {
        nextState[0].cover = true;
      }

      return nextState;
    }

    case "SET_COVER": {
      const cover = find(state, { cover: true });

      return state.map((image) => {
        if (image.id === action.id) {
          return { ...image, cover: true };
        }

        if (image.id === cover?.id) {
          return { ...image, cover: false };
        }

        return image;
      });
    }
  }
}

function useImageReducer(images) {
  return useReducer(reducer, images);
}

export default useImageReducer;

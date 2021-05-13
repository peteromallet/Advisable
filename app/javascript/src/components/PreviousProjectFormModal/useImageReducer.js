import { useReducer, useCallback, useMemo } from "react";
import generateID from "src/utilities/generateID";

function attributesFromAttachment(attachment) {
  return {
    id: attachment.id,
    key: generateID("ppi"),
    uploading: false,
    url: attachment.url,
    cover: attachment.cover,
    position: attachment.position,
    signedId: attachment.signedId,
  };
}

function initializeState(attachments) {
  const images = attachments.map((attachment) => {
    return attributesFromAttachment(attachment);
  });

  const hasCover = images.some((i) => i.cover);
  if (!hasCover && images.length > 0) {
    images[0].cover = true;
  }

  return images;
}

function reducer(state, action) {
  switch (action.type) {
    case "NEW_UPLOAD": {
      const cover = state.find((i) => i.cover);

      return [
        ...state,
        {
          key: generateID("ppi"),
          uploading: true,
          file: action.file,
          cover: !cover && state.length === 0,
          position: (state[state.length - 1]?.position || 0) + 1,
        },
      ];
    }

    case "UPLOAD_FINISHED": {
      return state.map((image) => {
        if (image.key === action.key) {
          return {
            ...image,
            ...attributesFromAttachment(action.image),
            cover: image.cover,
            id: image.id,
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
  const [state, dispatch] = useReducer(reducer, initState);

  const addUpload = useCallback((file) => {
    dispatch({
      type: "NEW_UPLOAD",
      file,
    });
  }, []);

  const setCover = useCallback((image) => {
    dispatch({ type: "SET_COVER", key: image.key });
  }, []);

  const remove = useCallback((image) => {
    dispatch({
      type: "REMOVE_IMAGE",
      key: image.key,
    });
  }, []);

  const finishUpload = useCallback((key, image) => {
    dispatch({
      type: "UPLOAD_FINISHED",
      key,
      image,
    });
  }, []);

  const length = useMemo(() => state.length, [state]);

  return { state, length, addUpload, setCover, remove, finishUpload };
}

export default useImageReducer;

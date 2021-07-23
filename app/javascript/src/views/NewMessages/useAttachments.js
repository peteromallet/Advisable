import { useCallback, useReducer } from "react";
import generateID from "src/utilities/generateID";

function attachmentsReducer(state, action) {
  switch (action.type) {
    case "RESET": {
      return [];
    }
    case "ADD": {
      return [
        ...state,
        ...Array.from(action.files).map((file) => ({
          file,
          id: generateID(),
          uploaded: false,
        })),
      ];
    }
    case "REMOVE": {
      return state.filter((a) => a.id !== action.id);
    }
    case "COMPLETE": {
      return state.map((a) => {
        if (a.id === action.id) {
          return { ...a, uploaded: true };
        }

        return a;
      });
    }
  }
}

export default function useAttachments() {
  const [state, dispatch] = useReducer(attachmentsReducer, []);

  const addAttachments = useCallback((e) => {
    return dispatch({
      type: "ADD",
      files: e.target.files,
    });
  }, []);

  const removeAttachment = useCallback((id) => {
    return dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  const completeUpload = useCallback((id) => {
    return dispatch({
      id,
      type: "COMPLETE",
    });
  }, []);

  const clearAttachments = useCallback(() => {
    return dispatch({
      type: "RESET",
    });
  }, []);

  return {
    attachments: state,
    dispatch,
    addAttachments,
    removeAttachment,
    completeUpload,
    clearAttachments,
  };
}

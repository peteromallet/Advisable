import { useCallback, useReducer, useMemo } from "react";
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
          return { ...a, blob: action.blob };
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

  const completeUpload = useCallback((id, blob) => {
    return dispatch({
      id,
      blob,
      type: "COMPLETE",
    });
  }, []);

  const clearAttachments = useCallback(() => {
    return dispatch({
      type: "RESET",
    });
  }, []);

  const pendingAttacthments = useMemo(() => {
    return state.filter((a) => !a.blob);
  }, [state]);

  const uploadedAttachments = useMemo(() => {
    return state.filter((a) => Boolean(a.blob));
  }, [state]);

  const signedIds = useMemo(() => {
    return uploadedAttachments.map((a) => a.blob.signed_id);
  }, [uploadedAttachments]);

  const uploading = useMemo(() => {
    return pendingAttacthments.length !== 0;
  }, [pendingAttacthments]);

  return {
    attachments: state,
    dispatch,
    uploading,
    signedIds,
    addAttachments,
    removeAttachment,
    completeUpload,
    clearAttachments,
  };
}

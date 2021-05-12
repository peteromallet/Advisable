import { useEffect, useRef, useState } from "react";
import { DirectUpload } from "@rails/activestorage";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

export default function useUpload(file, config = {}) {
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
        console.error(error);
      } else {
        success(blob);
      }
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.current = e.target.result;
    };

    reader.readAsDataURL(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { percentage, preview: preview.current };
}

import { useEffect, useMemo, useState } from "react";
import { DirectUpload } from "@rails/activestorage";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

export default function useUpload(file, onSuccess) {
  const [percentage, setPercentage] = useState(0);

  const progressHandler = useMemo(
    () => ({
      directUploadWillStoreFileWithXHR(request) {
        request.upload.addEventListener("progress", (e) => {
          const p = Math.round((100 * e.loaded) / e.total);
          setPercentage(p);
        });
      },
    }),
    [],
  );

  useEffect(() => {
    const upload = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    upload.create((error, blob) => {
      if (error) {
        console.error(error);
      } else {
        onSuccess(blob);
      }
    });
  }, [file, progressHandler, onSuccess]);

  return { percentage };
}

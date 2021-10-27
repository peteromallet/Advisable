import { useState } from "react";
import { useNotifications } from "src/components/Notifications";
import { DirectUpload } from "@rails/activestorage";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import matchFileType from "src/utilities/matchFileType";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

export default function useFileUpload({
  onChange,
  updated,
  maxSizeInMB = 2,
  accept,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const { error } = useNotifications();

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setUploadProgress(p);
      });
    },
  };

  const upload = (file) => {
    const u = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    u.create(async (error, blob) => {
      if (error) {
        console.error(error);
      } else {
        setProcessing(true);
        setUploading(false);
        setUploadProgress(0);
        await onChange(blob);
        setProcessing(false);
      }
    });
  };

  const handleChange = (e) => {
    if (!e.target?.value) return false;
    const files = Array.from(e.target.files);

    // Check file type
    if (!matchFileType(files, accept)) {
      error(`Please select one of the following file types: ${accept}`);
      return false;
    }
    // Check file size
    if (filesExceedLimit(files, maxSizeInMB)) {
      error(`File size cannot exceed ${maxSizeInMB} MB`);
      return false;
    }

    setUploading(true);
    files.forEach((file) => upload(file));
  };

  const progress =
    (uploadProgress / 100) * 80 ||
    (processing && 90) ||
    (updated === false && 100) ||
    0;

  return { handleChange, progress, uploading, processing, accept };
}

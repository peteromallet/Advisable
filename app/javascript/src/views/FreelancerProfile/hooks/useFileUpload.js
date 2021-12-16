import { useState } from "react";
import { useNotifications } from "src/components/Notifications";
import { DirectUpload } from "@rails/activestorage";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import matchFileType from "src/utilities/matchFileType";
import useLoadImage from "src/hooks/useLoadImage";
import { gql, useLazyQuery } from "@apollo/client";

const GET_TOKEN = gql`
  query UploadToken($resource: String!, $attachment: String!) {
    directUpload(resource: $resource, attachment: $attachment) {
      url
      name
      token
    }
  }
`;

export default function useFileUpload(
  resource,
  attachment,
  { onChange, maxSizeInMB = 2, accept, src },
) {
  const [getToken] = useLazyQuery(GET_TOKEN);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const notifications = useNotifications();
  const { updated, error } = useLoadImage(src);

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setUploadProgress(p);
      });
    },
  };

  const fetchUploadKeys = async () => {
    const response = await getToken({
      variables: { resource, attachment },
    });

    return response.data.directUpload;
  };

  const upload = async (file) => {
    const { url, name, token } = await fetchUploadKeys();
    const u = new DirectUpload(file, url, token, name, progressHandler);

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
      notifications.error(
        `Please select one of the following file types: ${accept}`,
      );
      return false;
    }
    // Check file size
    if (filesExceedLimit(files, maxSizeInMB)) {
      notifications.error(`File size cannot exceed ${maxSizeInMB} MB`);
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

  return {
    handleChange,
    progress,
    uploading,
    processing,
    accept,
    updated,
    error,
  };
}

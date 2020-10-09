import React from "react";
import { DirectUpload } from "@rails/activestorage";
import { FileUploader } from "../styles";
import { Camera } from "@styled-icons/feather";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const FileUpload = ({ label, onChange, preview }) => {
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setPercentage(p);
      });
    },
  };

  const upload = (file) => {
    setFile(file);
    const u = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    u.create((error, blob) => {
      if (error) {
        console.log("error", error);
      } else {
        setPercentage(0);
        setUploading(false);
        onChange(blob);
      }
    });
  };

  const handleChange = (e) => {
    setUploading(true);
    Array.from(e.target.files).forEach((file) => upload(file));
  };

  let mainText = label;

  if (file) {
    mainText = file.name;
  }

  if (uploading) {
    mainText = `Uploading ${file.name}...`;
  }

  return (
    <FileUploader>
      <Camera size={20} strokeWidth={2} />
      <input type="file" onChange={handleChange} />
    </FileUploader>
  );
};

export default FileUpload;

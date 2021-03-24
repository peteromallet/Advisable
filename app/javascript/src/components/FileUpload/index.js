import React from "react";
import { DirectUpload } from "@rails/activestorage";
import {
  FileUploadStyles,
  FileUploader,
  Info,
  MainText,
  SubText,
  Preview,
  ProgressBar,
} from "./styles";
import { useNotifications } from "src/components/Notifications";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import matchFileType from "src/utilities/matchFileType";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const FileUpload = ({ label, onChange, preview, accept, maxSizeInMB = 2 }) => {
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);
  const { error } = useNotifications();

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
        console.error(error);
      } else {
        setPercentage(0);
        setUploading(false);
        onChange(blob);
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

  let mainText = label;

  if (file) {
    mainText = file.name;
  }

  if (uploading) {
    mainText = `Uploading ${file.name}...`;
  }

  return (
    <FileUploadStyles>
      <FileUploader>
        {preview && <Preview>{preview(file)}</Preview>}
        <Info uploading={uploading}>
          <MainText>{mainText}</MainText>
          <SubText>
            {accept} | {maxSizeInMB} MB
          </SubText>
        </Info>
        <input type="file" accept={accept} onChange={handleChange} />
        {uploading && <ProgressBar percentage={percentage} />}
      </FileUploader>
    </FileUploadStyles>
  );
};

export default FileUpload;

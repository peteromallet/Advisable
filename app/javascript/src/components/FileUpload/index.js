import { useState } from "react";
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

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const FileUpload = ({ label, onChange, preview }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

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
    <FileUploadStyles>
      <FileUploader>
        {preview && <Preview>{preview(file)}</Preview>}
        <Info uploading={uploading}>
          <MainText>{mainText}</MainText>
          <SubText>png, jpg. 500x500px</SubText>
        </Info>
        <input type="file" onChange={handleChange} />
        {uploading && <ProgressBar percentage={percentage} />}
      </FileUploader>
    </FileUploadStyles>
  );
};

export default FileUpload;

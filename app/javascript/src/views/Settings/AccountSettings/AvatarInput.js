import React, { useState } from "react";
import { DirectUpload } from "@rails/activestorage";
import Avatar from "src/components/Avatar";
import matchFileType from "src/utilities/matchFileType";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import { useNotifications } from "src/components/Notifications";
import { useUpdateAccount } from "./queries";
import Button from "src/components/Button";
import CircularButton from "src/components/CircularButton";
import { Close } from "@styled-icons/ionicons-outline/Close";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const FormatTag = ({ children }) => (
  <div className="p-1 text-xs font-medium rounded text-neutral500 ring-neutral300 ring-1">
    {children}
  </div>
);

export default function AvatarInput({
  accept = ".png, .jpg, .jpeg",
  maxSizeInMB = 2,
  avatar,
  name,
}) {
  const { error } = useNotifications();
  const [updateAccount] = useUpdateAccount();
  const [uploading, setUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        console.log("loaded", e.loaded, e.total);
        const p = Math.round((100 * e.loaded) / e.total);
        setPercentage(p);
      });
    },
  };

  const upload = (file) => {
    const u = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    u.create(async (error, blob) => {
      if (error) {
        console.error(error);
      } else {
        // setPercentage(90);
        await updateAccount({
          variables: {
            input: { avatar: blob.signed_id },
          },
        });
        setPercentage(0);
        setUploading(false);
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

  return (
    <div className="relative flex items-center gap-6 p-4 mb-8 overflow-hidden transition-all rounded-lg  bg-white ring-2 ring-neutral100 hover:ring-2 hover:-translate-y-0.5 hover:ring-neutral200 hover:shadow-lg">
      <Avatar
        src={avatar}
        name={name}
        size="2xl"
        className="border border-solid border-neutral100 ring-1 ring-white"
      />
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-neutral800">
          {avatar ? <>Update profile picture</> : <>Upload a profile picture</>}
        </h4>
        <div className="flex flex-row gap-2">
          <FormatTag>PNG</FormatTag>
          <FormatTag>JPG</FormatTag>
          <FormatTag>JPEG</FormatTag>
          <FormatTag>1 MB</FormatTag>
        </div>
      </div>
      {uploading ? (
        <div
          className={`absolute top-0 left-0 w-[${percentage}%] h-1 bg-blue300`}
        />
      ) : (
        <input
          type="file"
          name={name}
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          className="absolute inset-0 z-10 w-full h-full rounded-md opacity-0 cursor-pointer"
        />
      )}
      {Boolean(avatar) && (
        <CircularButton
          icon={Close}
          title="Delete profile picture"
          className="z-20 ml-auto"
          onClick={() =>
            updateAccount({ variables: { input: { avatar: null } } })
          }
        >
          Delete
        </CircularButton>
      )}
      {/* <Button
        className="z-20"
        onClick={() =>
          updateAccount({ variables: { input: { avatar: null } } })
        }
      >
        Delete
      </Button> */}
    </div>
  );
}

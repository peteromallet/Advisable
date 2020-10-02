import React from "react";
import FileUpload from "./FileUpload";
import { StyledAvatarCard, StyledAvatarImage } from "./styles";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import { UPDATE_PROFILE } from "../../queries";
import useImageOnLoad from "src/hooks/useImageOnLoad";

function Avatar({ avatar, isOwner }) {
  const [updateAvatar] = useMutation(UPDATE_PROFILE);
  const loaded = useImageOnLoad(avatar);
  const notifications = useNotifications();

  const submit = async (blob) => {
    await updateAvatar({
      variables: { input: { avatar: blob.signed_id } },
    });
    notifications.notify("Profile picture has been updated");
  };

  return (
    <StyledAvatarCard
      width="190px"
      height="234px"
      elevation="m"
      mt="-66px"
      ml="32px"
      mr="30px"
      borderRadius={16}
    >
      {isOwner && <FileUpload onChange={submit} />}
      <StyledAvatarImage loaded={loaded} src={avatar} />
    </StyledAvatarCard>
  );
}

export default Avatar;

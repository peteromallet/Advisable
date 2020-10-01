import React from "react";
import { Box } from "@advisable/donut";
import FileUpload from "./FileUpload";
import { StyledAvatarCard } from "./styles";
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
      width={190}
      height={234}
      elevation="m"
      mt="-66px"
      ml="32px"
      mr="30px"
      borderRadius={16}
    >
      {isOwner && <FileUpload onChange={submit} />}
      <Box
        as="img"
        src={avatar}
        visibility="hidden"
        width="190px"
        height="234px"
        borderRadius={16}
        css={`
          object-fit: cover;
          visibility: ${loaded ? "visible" : "hidden"};
        `}
      />
    </StyledAvatarCard>
  );
}

export default Avatar;

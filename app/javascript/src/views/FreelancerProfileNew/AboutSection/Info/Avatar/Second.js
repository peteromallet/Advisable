import React from "react";
import FileUpload from "./FileUpload";
import { StyledAvatarCard, StyledAvatarImage } from "./styles";
import { User } from "@styled-icons/feather";
import { Box } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import { UPDATE_PROFILE } from "../../../queries";
import useImageOnLoad from "src/hooks/useImageOnLoad";

function DefaultAvatar() {
  return (
    <Box
      color="neutral900"
      width="190px"
      height="234px"
      bg="neutral200"
      borderRadius={16}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <User size={104} fill="#fff" strokeWidth={0} />
    </Box>
  );
}

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
      maxWidth={["128px", "none"]}
      maxHeight={["156px", "none"]}
      width={["30vw", "130px", "190px", "190px"]}
      height={["36.52vw", "160px", "234px", "234px"]}
      elevation="m"
      mt={{ _: "-48px", m: "-66px" }}
      ml={{ _: "10px", s: "24px", l: "24px" }}
      borderRadius={16}
    >
      {isOwner && <FileUpload onChange={submit} />}
      {avatar && (
        <StyledAvatarImage
          as="img"
          loaded={loaded}
          src={avatar}
          maxWidth={["128px", "none"]}
          maxHeight={["156px", "none"]}
          width={["30vw", "130px", "190px", "190px"]}
          height={["36.52vw", "160px", "234px", "234px"]}
        />
      )}
      {!avatar && <DefaultAvatar />}
    </StyledAvatarCard>
  );
}

export default Avatar;

import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
// Hooks
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import useImageOnLoad from "src/hooks/useImageOnLoad";
// Components
import { Box, theme, StyledCard } from "@advisable/donut";
import { User } from "@styled-icons/feather";
import FileUpload from "../FileUpload";
// Queries
import { UPDATE_PROFILE } from "../../queries";

export const StyledAvatarCard = styled(StyledCard)`
  z-index: 2;
  position: relative;
  transition: box-shadow 300ms;
  background-color: ${theme.colors.neutral200};
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 8px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.22)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.3)};
  }
`;

export const StyledAvatarImage = styled(Box)`
  border-radius: 16px;
  object-fit: cover;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 400ms;
`;

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
  const { loaded, updated } = useImageOnLoad(avatar);
  const notifications = useNotifications();

  const submit = async (blob) => {
    await updateAvatar({
      variables: { input: { avatar: blob.signed_id } },
    });
    notifications.notify("Profile picture has been updated");
  };

  return (
    <Box>
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
        {isOwner && <FileUpload onChange={submit} updated={updated} />}
        {avatar && (
          <StyledAvatarImage
            as="img"
            loaded={loaded}
            src={avatar}
            width="100%"
            height="100%"
          />
        )}
        {!avatar && <DefaultAvatar />}
      </StyledAvatarCard>
    </Box>
  );
}

export default Avatar;

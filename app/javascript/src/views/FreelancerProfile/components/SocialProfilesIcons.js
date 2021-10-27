import React from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";
import {
  Box,
  Link,
  theme,
  useModal,
  Modal,
  DialogDisclosure,
} from "@advisable/donut";
import { Linkedin } from "@styled-icons/fa-brands/Linkedin";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import { Twitter } from "@styled-icons/fa-brands/Twitter";
import { Medium } from "@styled-icons/fa-brands/Medium";
import { Instagram } from "@styled-icons/fa-brands/Instagram";
import { Globe } from "@styled-icons/heroicons-solid/Globe";
import SocialProfilesForm from "./SocialProfilesForm";
import useViewer from "src/hooks/useViewer";
import { useParams } from "react-router";

const StyledEditButton = styled.button`
  height: 28px;
  cursor: pointer;
  display: inline-block;
  background-color: ${theme.colors.neutral100};
  color: ${theme.colors.neutral600};
  padding: 0 8px;
  border-radius: 14px;
  border: 0;

  &:hover {
    color: ${lighten("0.05", theme.colors.neutral600)};
    background-color: ${lighten("0.005", theme.colors.neutral100)};
  }

  &:active {
    color: ${darken("0.1", theme.colors.neutral600)};
    background-color: ${darken("0.02", theme.colors.neutral100)};
  }
`;

export const StyledSocialIcon = styled.div`
  color: ${theme.colors.neutral400};
  cursor: pointer;
  display: inline;

  &:hover {
    color: ${theme.colors.neutral600};
  }
`;

function SocialIcon({ icon: Icon, href }) {
  return (
    <Link.External href={href} target="_blank" mr={1.5}>
      <StyledSocialIcon>
        <Icon size={28} />
      </StyledSocialIcon>
    </Link.External>
  );
}

export default function SocialProfilesIcons({ specialist }) {
  const { linkedin, twitter, instagram, medium, website } = specialist;
  const isEmpty = ![linkedin, twitter, instagram, medium, website].some(
    Boolean,
  );
  const viewer = useViewer();
  const params = useParams();
  const isOwner = viewer?.id === params.id;

  const modal = useModal();
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {specialist.linkedin ? (
        <SocialIcon icon={Linkedin} href={specialist.linkedin} />
      ) : null}
      {specialist.twitter ? (
        <SocialIcon icon={Twitter} href={specialist.twitter} />
      ) : null}
      {specialist.instagram ? (
        <SocialIcon icon={Instagram} href={specialist.instagram} />
      ) : null}
      {specialist.medium ? (
        <SocialIcon icon={Medium} href={specialist.medium} />
      ) : null}
      {specialist.website ? (
        <SocialIcon icon={Globe} href={specialist.website} />
      ) : null}

      {isOwner ? (
        isEmpty ? (
          <DialogDisclosure as={StyledEditButton} {...modal}>
            Add social links
          </DialogDisclosure>
        ) : (
          <DialogDisclosure as={StyledEditButton} {...modal}>
            <Pencil size={20} />
          </DialogDisclosure>
        )
      ) : null}
      <Modal modal={modal} p="xxl" label="Edit social profiles" width={640}>
        <SocialProfilesForm specialist={specialist} modal={modal} />
      </Modal>
    </Box>
  );
}

import React from "react";
import styled from "styled-components";
import { GuildBox, breakpoint } from "@guild/styles";
import { Close } from "@styled-icons/ionicons-outline";
import { theme } from "@advisable/donut";

const { colors } = theme;

export const StyledModal = styled(GuildBox)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  z-index: 3;
  background: white;
  width: 90%;
  max-width: 817px;
  display: flex;
  border-radius: 4px;
`;

const CloseContainer = styled(GuildBox)`
  cursor: pointer;
  position: absolute;
  top: -15px;
  right: -10px;
  width: 30px;
  height: 30px;

  ${breakpoint.smallAndUp} {
    top: -20px;
    right: -20px;
    width: 40px;
    height: 40px;
  }
  display: flex;
  border-radius: 50%;
  background: white;
  border: 1px solid ${colors.catalinaBlue100};
`;

export const ModalClose = ({ onClose }) => (
  <CloseContainer flexCenterBoth onClick={onClose}>
    <Close width={"70%"} color={colors.catalinaBlue100} />
  </CloseContainer>
);

import styled from "styled-components";
import { GuildBox } from "@guild/styles";

export const StyledModal = styled(GuildBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: white;
  width: 90%;
  max-width: 817px;
  display: flex;
  border-radius: 4px;
`;

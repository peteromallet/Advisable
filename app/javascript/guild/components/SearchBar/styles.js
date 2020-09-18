import styled from "styled-components";
import { theme } from "@advisable/donut";
import { Input, Button as ReactStrapButton } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { colors } = theme;

export const SearchInput = styled(Input)`
  font-size: 16px;
  padding: 0 16px;
  border-radius: 4px 0 0 4px !important;

  &:focus {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }

  :placeholder {
    color: ${colors.darkGrey};
  }
`;

export const SearchButton = styled(ReactStrapButton)`
  background-color: ${colors.neutral50} !important;
  border-color: #ced4da !important;
  border-left: 1px solid ${colors.darkGrey} !important;
  svg {
    fill: ${colors.darkGrey};
  }

  &:hover {
    svg {
      fill: ${colors.froly};
    }
  }
`;

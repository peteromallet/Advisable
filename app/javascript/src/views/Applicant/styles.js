import { rgba } from "polished";
import styled from "styled-components";
import colors from "../../colors";
import { Avatar } from "../../components/Avatar/styles";
import { FeaturedBadge } from "../../components/FeaturedBadge";

export const OtherApplication = styled.div`
  cursor: pointer;
  position: relative;
  padding: 14px 30px 14px 70px;
  border-bottom: 1px solid ${rgba(colors.neutral.s8, 0.1)};

  &:hover {
    background: ${rgba(colors.neutral.s1, 0.4)};
  }

  &:last-child {
    border-bottom: none;
  }

  ${Avatar} {
    top: 50%;
    left: 30px;
    position: absolute;
    transform: translateY(-50%);
  }

  ${FeaturedBadge} {
    top: 50%;
    right: 30px;
    position: absolute;
    transform: translateY(-50%);
  }
`
import { rgba } from "polished";
import styled, { css } from "styled-components";
import colors from "../../colors";
import { Avatar } from "../../components/Avatar/styles";
import { FeaturedBadge } from "../../components/FeaturedBadge";
import { mobileBreakpoint } from "../../utilities/useMobile";

export const OtherApplication = styled.div`
  cursor: pointer;
  position: relative;
  padding: 14px 30px 14px 75px;
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

  ${mobileBreakpoint} {
    padding-left: 60px;
    padding-right: 60px;

    ${Avatar} {
      left: 20px;
    }

    ${FeaturedBadge} {
      right: 10px;
    }
  }
`;

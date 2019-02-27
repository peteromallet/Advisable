import styled from "styled-components";
import colors from "../../../colors";
import { rgba } from "polished";

export const InvitationsWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;

  @media (max-width: 800px) {
    width: auto;
    margin-left: -4%;
    margin-right: -4%;
    overflow-y: hidden;
  }
`;

export const Invitations = styled.div`
  display: flex;
  padding-top: 20px;

  @media (min-width: 800px) {
    flex-wrap: wrap;
    margin-left: -8px;
    margin-right: -8px;
  }

  @media (max-width: 800px) {
    padding-left: 4%;
    padding-right: 4%;
    flex-wrap: nowrap;
    overflow-x: scroll;
    scroll-padding: 0 4%;
    padding-bottom: 30px;
    margin-bottom: -30px;
    -webkit-overflow-scrolling: touch;
  }

  &::after {
    content: "";
    flex: 0 0 12%;
  }
`;

export const Title = styled.h4`
  color: white;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
`;

export const Rate = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.85);
`;

export const Description = styled.p`
  width: 100%;
  height: 70px;
  font-size: 13px;
  font-weight: 500;
  line-height: 17px;
  position: relative;
  margin-bottom: 20px;
  white-space: normal;
  color: rgba(255, 255, 255, 0.9);
`;

export const Button = styled.button`
  border: none;
  height: 32px;
  cursor: pointer;
  padding: 0 16px;
  font-size: 13px;
  appearance: none;
  font-weight: 500;
  background: white;
  line-height: 28px;
  border-radius: 6px;
  left: 20px;
  bottom: 20px;
  z-index: 2;
  position: absolute;
  transition: transform 300ms;
  transform: translate3d(0, 0, 0);

  svg {
    margin-left: 8px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 220px;
  padding: 20px;
  transition: transform 300ms;
  transform: translate3d(0, 0, 0);
`;

export const Background = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: 6px;
  position: absolute;
  transform: scale(1);
  transition: transform 300ms, box-shadow 300ms;
`;

export const Invitation = styled.div`
  width: 100%;
  cursor: pointer;
  user-select: none;
  position: relative;

  &::after {
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    height: 110px;
    position: absolute;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  @media (min-width: 800px) {
    margin: 0 8px;
    margin-bottom: 16px;
    max-width: calc(33.3333% - 16px);
    flex: 1 0 calc(33.3333% - 16px);
  }

  @media (max-width: 800px) {
    width: 90%;
    flex: 0 0 auto;
    margin-right: 16px;
  }

  &:hover {
    @media (min-width: 800px) {
      ${Background} {
        transform: scale(1.02);
        box-shadow: 0px 10px 16px -10px ${rgba(colors.teal.dark, 0.6)};
      }

      ${Content} {
        transform: translate3d(0, -2px, 0);
      }

      ${Button} {
        transform: translate3d(0, -4px, 0);
      }
    }
  }

  /* Teal Card */
  ${Background} {
    background: ${colors.teal.base};
    box-shadow: 0px 3px 5px -3px ${rgba(colors.teal.dark, 0.3)};
  }

  &::after {
    background: linear-gradient(
      ${rgba(colors.teal.base, 0)} 0%,
      ${rgba(colors.teal.base, 1)} 40%
    );
  }

  ${Button} {
    fill: ${colors.teal.dark};
    color: ${colors.teal.dark};
  }

  /* Purple Cards */
  &:nth-child(2) {
    ${Background} {
      background: ${colors.purple.base};
      box-shadow: 0px 3px 5px -3px ${rgba(colors.purple.dark, 0.3)};
    }

    &:hover ${Background} {
      box-shadow: 0px 10px 16px -10px ${rgba(colors.purple.dark, 0.5)};
    }

    &::after {
      background: linear-gradient(
        ${rgba(colors.purple.base, 0)} 0%,
        ${rgba(colors.purple.base, 1)} 40%
      );
    }

    ${Button} {
      fill: ${colors.purple.dark};
      color: ${colors.purple.dark};
    }
  }

  /* Dark Cards */
  &:nth-child(3) {
    ${Background} {
      background: #372F58;
      box-shadow: 0px 3px 5px -3px ${rgba("#372F58", 0.3)};
    }

    &:hover ${Background} {
      box-shadow: 0px 10px 16px -10px ${rgba("#372F58", 0.5)};
    }

    &::after {
      background: linear-gradient(
        ${rgba("#372F58", 0)} 0%,
        ${rgba("#372F58", 1)} 40%
      );
    }

    ${Button} {
      fill: #372F58;
      color: #372F58;
    }
  }
`;

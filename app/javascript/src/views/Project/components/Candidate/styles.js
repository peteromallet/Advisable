import { theme } from "@advisable/donut";
import styled, { keyframes } from "styled-components";
import { default as BaseCard } from "src/components/Card";
import { Avatar } from "src/components/Avatar/styles";
import { AdvisableComment } from "../AdvisableComment";
import { FeaturedBadge } from "src/components/FeaturedBadge";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ViewMore = styled.button`
  appearance: none;
  padding: 6px 12px;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  color: ${theme.colors.neutral700};
  font-family: "Poppins", sans-serif;
  border: 1px solid ${theme.colors.neutral100};

  svg {
    margin-right: 8px;
  }
`;

export const Card = styled(BaseCard)`
  opacity: 0;
  margin-bottom: 20px;
  transition: box-shadow 300ms ease-out;
  animation: ${slideUp} 700ms cubic-bezier(0.3, 0, 0, 1) forwards;
  box-shadow: ${(props) =>
    props.expanded
      ? `0 50px 200px -50px rgba(55, 69, 120, 0.45)`
      : `0 15px 40px -15px rgba(55, 69, 120, 0.2)`};

  &:nth-child(2) {
    animation-delay: 100ms;
  }
  &:nth-child(3) {
    animation-delay: 200ms;
  }
  &:nth-child(4) {
    animation-delay: 300ms;
  }
  &:nth-child(5) {
    animation-delay: 400ms;
  }
  &:nth-child(6) {
    animation-delay: 500ms;
  }

  .ViewMore {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const NameAndLocation = styled.div`
  margin-left: 15px;
  flex: "1 1 auto";
`;

export const Name = styled.h3`
  color: #26234b;
  line-height: 1;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: -0.03em;
`;

export const Location = styled.span`
  color: #7a779f;
  line-height: 1;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.03em;
`;

export const CandidateHeaderActions = styled.div`
  top: 5px;
  right: 0;
  display: flex;
  position: absolute;
  align-items: center;

  @media (max-width: 768px) {
    top: 15px;
  }

  ${AdvisableComment} {
    margin-left: 15px;
  }
`;

export const CandidateHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    display: block;

    ${Avatar} {
      width: 70px;
      height: 70px;
    }

    ${NameAndLocation} {
      margin-left: 0;
      margin-top: 15px;
    }

    ${FeaturedBadge} span {
      display: none;
    }
  }
`;

export const MoreInfo = styled.div`
  width: 100%;
`;

export const CandidateWrapper = styled.div.attrs((props) => ({
  style: {
    opacity: props.opacity,
    height: `${props.height}px`,
  },
}))`
  box-sizing: border-box;
  padding-bottom: 20px;
`;

export const Question = styled.div`
  width: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
`;

export const QuestionTitle = styled.h5`
  width: 100%;
  margin-bottom: 10px;
`;

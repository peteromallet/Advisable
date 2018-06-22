import styled, { keyframes } from "styled-components";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Card = styled.div`
  opacity: 0;
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 20px;
  transition: box-shadow 300ms ease-out;
  animation: ${slideUp} 700ms cubic-bezier(0.3, 0, 0, 1) forwards;
  box-shadow: ${props =>
    props.expanded
      ? `0 50px 200px -50px rgba(55, 69, 120, 0.45)`
      : `0 15px 40px -15px rgba(55, 69, 120, 0.2)`};

  &:nth-child(2) { animation-delay: 100ms }
  &:nth-child(3) { animation-delay: 200ms }
  &:nth-child(4) { animation-delay: 300ms }
  &:nth-child(5) { animation-delay: 400ms }
  &:nth-child(6) { animation-delay: 500ms }
`;

export const Name = styled.h3`
  color: #26234b;
  line-height: 1;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 3px;
  letter-spacing: -0.05em;
`;

export const Location = styled.span`
  color: #736f9a;
  line-height: 1;
  font-size: 17px;
  font-weight: 400;
`;

export const CandidateContent = styled.div`
  padding: 20px 20px 0 20px;
  cursor: pointer;
`;

export const Preview = styled.div`
  position: relative;

  ${props =>
    !props.expanded &&
    `
    &::before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      position: absolute;
    }
  `};
`;

export const MoreInfo = styled.div`
  overflow-y: hidden;
  width: 100%;
`;

export const CandidateHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const NameAndLocation = styled.div`
  margin-left: 15px;
`;

export const CandidateAttributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding-right: 10px;
  justify-content: space-between;
`;

export const Attribute = styled.div`
  margin-bottom: 15px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const AttributeLabel = styled.span`
  color: #92a1b1;
  display: block;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 2px;
`;

export const AttributeValue = styled.span`
  color: #21344a;
  display: block;
  font-size: 16px;
  font-weight: 500;

  a {
    color: #0064FF;
    text-decoration: none;
    &:hover {
      color: #004EC7;
    }
  }
`;

export const CandidateWrapper = styled.div.attrs({
  style: ({ height, opacity }) => ({
    opacity: opacity,
    height: `${height}px`
  })
})`
  box-sizing: border-box;
  padding-bottom: 20px;
`;

export const CandidateFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #f2f2f2;

  ${Button} {
    margin-right: 15px;
  }
`;
export const Description = styled.div`
  margin-bottom: 30px;
`;

export const Question = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
`;

export const QuestionTitle = styled.h5`
  width: 100%;
  margin-bottom: 10px;
`;

export const Skill = styled.div`
  height: 30px;
  color: #243D59;
  font-size: 15px;
  padding: 0 20px;
  line-height: 29px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  background: #E8F2FC;
  display: inline-block;
`

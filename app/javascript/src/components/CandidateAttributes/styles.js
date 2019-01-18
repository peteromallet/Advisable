import { rgba } from "polished";
import styled from "styled-components";

export const CandidateAttributes = styled.div`
  display: flex;
  margin: 30px 0;
  padding: ${props => (props.compact ? "20px 0" : "30px 0")};
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${rgba("#0A2248", 0.1)};
  border-bottom: 1px solid ${rgba("#0A2248", 0.1)};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const CandidateAttribute = styled.div`
  font-size: 16px;
  align-items: center;

  @media (max-width: 900px) {
    display: inline-block;
  }

  @media (max-width: 768px) {
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const CandidateAttributeLabel = styled.div`
  color: #757fa4;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
  text-transform: uppercase;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const CandidateAttributeValue = styled.div`
  color: #0b1426;
  font-weight: 500;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const CandidateRating = styled.div`
  @media (max-width: 900px) {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${rgba("#0A2248", 0.1)};
  }
`

export const ReviewsCount = styled.span`
  color: #8c93ae;
  font-size: 14px;
  font-weight: 500;
`;

export const Linkedin = styled.a`
  fill: #3d495c;
  color: #3d495c;
  font-size: 15px;
  text-decoration: none;
  align-items: center;
  display: inline-flex;

  @media (max-width: 768px) {
    margin-top: 10px;
  }

  svg {
    margin-right: 10px;
  }

  &:hover {
    fill: #0064ff;
    color: #0064ff;
  }
`;

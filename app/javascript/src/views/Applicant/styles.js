import styled from "styled-components";
import Avatar from "src/components/Avatar";

export const ApplicantHeader = styled.div`

`

export const ApplicantAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 30px 0;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    margin: 25px 0;
  }
`;

export const ApplicantName = styled.h1`
  color: #1E1A48;
  font-size: 30px;
  font-weight: 800;
  line-height: 30px;
  margin-bottom: 8px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 2px;
  }
`;

export const ApplicantLocation = styled.p`
  color: #43506F;
  line-height: 1;
  font-size: 19px;
  margin-bottom: 15px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 20px;
  }
`

export const AppliedTo = styled.p`
  color: #43506F;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`

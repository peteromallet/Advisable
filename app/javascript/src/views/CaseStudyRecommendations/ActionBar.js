import React from "react";
import queryString from "query-string";
import styled from "styled-components";
import CaseStudyActions from "../CaseStudyRecommendations/CaseStudyActions";
import { useLocation } from "react-router-dom";

const StyledActionBarContainer = styled.div`
  bottom: 0;
  width: 100%;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledActionBar = styled.div`
  background: #ffffff;
  border-radius: 32px;
  display: inline-flex;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(24, 24, 64, 0.12),
    0px 12px 80px rgba(26, 26, 31, 0.16);
`;

export default function ActionBar({ caseStudy }) {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  return (
    <StyledActionBarContainer>
      <StyledActionBar>
        <CaseStudyActions searchId={queryParams.search} caseStudy={caseStudy} />
      </StyledActionBar>
    </StyledActionBarContainer>
  );
}

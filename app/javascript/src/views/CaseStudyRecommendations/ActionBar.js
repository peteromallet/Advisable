import React, { useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ArchiveButton from "./ArchiveButton";

const StyledActionBarContainer = styled.div`
  left: 50%;
  bottom: 0;
  width: 1000px;
  position: fixed;
  padding-left: 300px;
  transform: translateX(-50%);
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

export default function ActionBar({ search, caseStudy }) {
  const history = useHistory();

  const handleArchive = useCallback(() => {
    history.replace(`/explore/${search.id}`);
  }, [history, search]);

  return (
    <StyledActionBarContainer>
      <StyledActionBar>
        <ArchiveButton
          search={search}
          article={caseStudy}
          onArchive={handleArchive}
        />
      </StyledActionBar>
    </StyledActionBarContainer>
  );
}

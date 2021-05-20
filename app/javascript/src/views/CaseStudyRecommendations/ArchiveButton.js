import React, { useCallback } from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import { Archive } from "@styled-icons/heroicons-solid/Archive";
import { useArchive } from "./queries";

const StyledArchiveButtonLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.neutral700};
`;

const StyledArchiveButtonIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.blue900};
  background: ${theme.colors.neutral100};
  transition: background 300ms;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledArchiveButton = styled.div`
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  flex-direction: column;

  &:hover {
    ${StyledArchiveButtonIcon} {
      color: ${theme.colors.neutral600};
      background: ${theme.colors.neutral200};
    }
  }
`;

export default function ArchiveButton({ search, article, onArchive }) {
  const [archive] = useArchive();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();

      archive({
        variables: {
          input: {
            search: search.id,
            article: article.id,
          },
        },
      });

      onArchive();
    },
    [search, article, archive, onArchive],
  );

  return (
    <StyledArchiveButton onClick={handleClick}>
      <StyledArchiveButtonIcon>
        <Archive />
      </StyledArchiveButtonIcon>
      <StyledArchiveButtonLabel>Archive</StyledArchiveButtonLabel>
    </StyledArchiveButton>
  );
}

import styled from "styled-components";
import { top, variant } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledAvatarWrapper = styled.div``;
export const StyledNameWrapper = styled.div``;
export const StyledBioWrapper = styled.div``;

const layout = variant({
  prop: "layout",
  variants: {
    l: {
      gridTemplateRows: "auto",
      gridTemplateColumns: "auto",
      width: "280px",
      marginRight: 8,
      [StyledAvatarWrapper]: {
        gridRow: "1",
      },
      [StyledNameWrapper]: {
        gridRow: "2",
        gridColumn: "1",
        paddingTop: 0,
        marginBottom: 4,
      },
      [StyledBioWrapper]: {
        gridRow: "3",
        gridColumn: "1",
      },
    },
    m: {
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "auto auto",
      columnGap: 4,
      width: "auto",
      [StyledAvatarWrapper]: {
        gridRow: "1 / last-line",
      },
      [StyledNameWrapper]: {
        gridRow: "1",
        gridColumn: "2",
        paddingTop: 12,
        marginBottom: 4,
      },
      [StyledBioWrapper]: {
        gridRow: "2",
        gridColumn: "2",
      },
    },
    s: {
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "auto 1fr",
      width: "auto",
      columnGap: 3,
      [StyledAvatarWrapper]: {
        gridRow: "1",
      },
      [StyledNameWrapper]: {
        gridRow: "1",
        gridColumn: "2",
        paddingTop: 8,
        marginBottom: 4,
      },
      [StyledBioWrapper]: {
        gridRow: "2",
        gridColumn: "1 / last-column",
      },
    },
  },
});

export const StyledStickySidebar = styled.div`
  ${layout}
  ${top}
  display: grid;
  position: sticky;
`;

export const StyledShowMore = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  position: static;
  transform: none;
  user-select: none;
  padding: 4px 4px;
  border-radius: 8px;
  color: ${theme.colors.neutral700};

  &:hover {
    background: ${theme.colors.neutral100};
  }
`;

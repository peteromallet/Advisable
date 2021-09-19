import styled from "styled-components";
import { variant } from "styled-system";

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
      marginRight: 4,
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

const type = variant({
  prop: "type",
  variants: {
    profile: {
      top: "108px",
    },
    article: {
      top: [null, null, null, "80px", "88px"],
    },
  },
});

export const StyledStickySidebar = styled.div`
  ${layout}
  ${type}
  display: grid;

  position: sticky;
`;

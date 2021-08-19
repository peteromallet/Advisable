import { StyledPassportAvatar } from "src/components/PassportAvatar/styles";
import styled from "styled-components";
import { variant } from "styled-system";

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
      [StyledPassportAvatar]: {
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
      [StyledPassportAvatar]: {
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
      [StyledPassportAvatar]: {
        gridRow: "1",
      },
      [StyledNameWrapper]: {
        gridRow: "1",
        gridColumn: "2",
        paddingTop: 13,
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
  display: grid;

  position: sticky;
  top: 108px;
`;

import css from "@styled-system/css";
import styled from "styled-components";
import { top } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledArticleAvatarWrapper = styled.div(
  css({
    gridRow: "1",
    position: "relative",
  }),
);
export const StyledAvatarWrapper = styled.div(
  css({
    position: "relative",
    marginBottom: 4,
    gridRow: ["1", "1", "1 / last-line", "1"],
    height: ["72px", "72px", "104px", "36px", "44px"],
    width: ["84px", "84px", "126px", "126px", "168px"],
  }),
);
export const StyledNameWrapper = styled.div(
  css({
    gridRow: ["1", "1", "1", "2"],
    gridColumn: ["2", "2", "2", "1"],
    paddingTop: [2, 2, 2, 2, 0],
    marginBottom: 4,
  }),
);
export const StyledBioWrapper = styled.div(
  css({
    gridRow: ["2", "2", "2", "3"],
    gridColumn: ["1 / last-column", "1 / last-column", "2", "1"],
  }),
);

export const StyledStickySidebar = styled.div(
  top,
  css({
    display: "grid",
    position: "sticky",
    gridTemplateRows: ["auto auto", "auto auto", "auto auto", "auto"],
    gridTemplateColumns: ["auto 1fr", "auto 1fr", "auto 1fr", "280px"],
    columnGap: [3, 3, 4],
  }),
);

export const StyledShowMore = styled.span`
  font-weight: 550;
  cursor: pointer;
  position: static;
  transform: none;
  user-select: none;
  padding: 2px 8px;
  margin-left: -4px;
  border-radius: 8px;
  letter-spacing: -0.012em;
  color: ${theme.colors.neutral800};

  &:hover {
    background: ${theme.colors.neutral100};
  }
`;

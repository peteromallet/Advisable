import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledMarkdown = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: ${theme.colors.neutral800};

  h1 {
    font-size: 30px;
    line-height: 34px;
    margin-bottom: 16px;
    letter-spacing: -0.03rem;
    color: ${theme.colors.neutral900};
  }

  h2 {
    font-size: 25px;
    line-height: 28px;
    margin-bottom: 10px;
    letter-spacing: -0.03rem;
    color: ${theme.colors.neutral900};
  }

  h3 {
    font-size: 22px;
    line-height: 25px;
    margin-bottom: 10px;
    letter-spacing: -0.02rem;
    color: ${theme.colors.neutral900};
  }

  p,
  .paragraph {
    margin-bottom: 32px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: disc;
    margin-bottom: 32px;
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: decimal;
    margin-bottom: 32px;
  }

  li {
    margin-left: 1.5rem;
    margin-bottom: 8px;
  }

  blockquote {
    margin: 12px 0;
    font-size: 22px;
    line-height: 28px;
    font-style: italic;
    padding-left: 24px;
    color: ${theme.colors.neutral700};
    border-left: 2px solid ${theme.colors.neutral700};
  }

  a {
    color: ${theme.colors.blue500};
    border-bottom: 1px solid ${theme.colors.blue200};
  }

  b,
  strong {
    font-weight: 600;
  }
`;

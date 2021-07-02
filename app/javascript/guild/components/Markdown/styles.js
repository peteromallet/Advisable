import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledMarkdown = styled.div`
  font-size: 18px;
  line-height: 24px;
  overflow-wrap: break-word;
  color: ${theme.colors.neutral800};

  p,
  ul,
  ol,
  li,
  b {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  h1 {
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 28px;
    line-height: 32px;
    font-weight: ${theme.fontWeights.semibold};
    margin-bottom: 16px;
    letter-spacing: -0.03rem;
    color: ${theme.colors.neutral900};
  }

  h2 {
    padding-top: 1px;
    padding-bottom: 1px;
    font-size: 20px;
    line-height: 24px;
    font-weight: ${theme.fontWeights.semibold};
    margin-bottom: 10px;
    letter-spacing: -0.03rem;
    color: ${theme.colors.neutral900};
  }

  h3 {
    font-size: 16px;
    line-height: 20px;
    font-weight: ${theme.fontWeights.semibold};
    margin-bottom: 12px;
    letter-spacing: -0.02rem;
    color: ${theme.colors.neutral900};
  }

  p,
  .paragraph {
    margin-bottom: 24px;
    padding-top: 2px;
    padding-bottom: 2px;
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
    font-style: italic;
    padding-left: 20px;
    color: ${theme.colors.neutral600};
    border-left: 2px solid ${theme.colors.neutral200};
  }

  blockquote * {
    margin: 0;
    font-size: 20px;
    line-height: 28px;
    padding-top: 7px;
    padding-bottom: 9px;
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

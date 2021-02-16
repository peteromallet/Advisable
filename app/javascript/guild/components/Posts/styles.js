import styled from "styled-components";
import { Box } from "@advisable/donut";

export const PopularPosts = styled(Box)`
  & > {
    :first-child {
      border-radius: 12px 12px 0 0;
      border-bottom: 1px solid #e9e9f3;
    }

    :nth-last-child(2) {
      border-radius: 0;
    }

    :last-child {
      border-radius: 0 0 12px 12px;
      border-top: 1px solid #e9e9f3;
    }
  }
`;

import React from "react";
import { Box, Avatar, StyledAvatar, theme } from "@advisable/donut";
import styled from "styled-components";
import { variant } from "styled-system";

const StyledName = styled.h5`
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.neutral900};
  margin-bottom: ${theme.space[1]};
`;
const StyledTitle = styled.p`
  color: ${theme.colors.neutral600};
`;
const StyledCommentWrapper = styled.div`
  grid-area: comment;
  background: ${theme.colors.neutral100};
  border-radius: 12px;
`;
const StyledComment = styled.p`
  position: relative;
  font-style: italic;
  line-height: 130%;
  color: ${theme.colors.neutral800};
`;
const StyledLeftBracket = styled.span`
  position: absolute;
  color: ${theme.colors.blue400};
  opacity: 0.6;
  line-height: 14px;
  vertical-align: bottom;
`;
const StyledRightBracket = styled.span`
  position: relative;
  color: ${theme.colors.blue400};
  right: 4px;
  opacity: 0.6;
  line-height: 12px;
  vertical-align: bottom;
`;

const size = variant({
  prop: "size",
  variants: {
    s: {
      gridTemplateColumns: "40px auto",
      gridTemplateAreas: `"avatar name" "comment comment"`,
      gridColumnGap: 3,
      [StyledAvatar]: {
        width: "40px",
        height: "40px",
      },
      [StyledName]: {
        fontSize: "m",
      },
      [StyledTitle]: {
        fontSize: "m",
      },
      [StyledCommentWrapper]: {
        padding: "m",
        paddingLeft: "xl",
      },
      [StyledComment]: {
        fontSize: "m",
      },
      [StyledLeftBracket]: {
        fontSize: "36px",
        left: "-18px",
        top: "8px",
      },
      [StyledRightBracket]: {
        fontSize: "36px",
      },
    },
    m: {
      gridTemplateColumns: "80px auto",
      gridTemplateAreas: `"avatar name" "avatar comment"`,
      gridColumnGap: 5,
      [StyledAvatar]: {
        width: "80px",
        height: "80px",
      },
      [StyledName]: {
        fontSize: "m",
      },
      [StyledTitle]: {
        fontSize: "m",
      },
      [StyledCommentWrapper]: {
        padding: "m",
        paddingLeft: "xl",
      },
      [StyledComment]: {
        fontSize: "l",
      },
      [StyledLeftBracket]: {
        fontSize: "36px",
        left: "-18px",
        top: "10px",
      },
      [StyledRightBracket]: {
        fontSize: "36px",
      },
    },
    l: {
      gridTemplateColumns: "100px auto",
      gridTemplateAreas: `"avatar name" "avatar comment"`,
      gridColumnGap: 8,
      [StyledAvatar]: {
        width: "100px",
        height: "100px",
      },
      [StyledName]: {
        fontSize: "l",
      },
      [StyledTitle]: {
        fontSize: "l",
      },
      [StyledCommentWrapper]: {
        padding: "l",
        paddingLeft: "2xl",
      },
      [StyledComment]: {
        fontSize: "xl",
      },
      [StyledLeftBracket]: {
        fontSize: "48px",
        left: "-24px",
        top: "10px",
      },
      [StyledRightBracket]: {
        fontSize: "48px",
      },
    },
  },
});

const StyledReview = styled.div`
  ${size}

  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: ${theme.space[2.5]};
`;

const Review = ({ review, size }) => {
  const { name, companyName } = review;
  return (
    <StyledReview size={size}>
      <Box gridArea="avatar">
        <Avatar name={review.name} url={review.avatar} />
      </Box>
      <Box gridArea="name" alignSelf="center">
        <StyledName>{name}</StyledName>
        <StyledTitle>{companyName}</StyledTitle>
      </Box>
      <StyledCommentWrapper>
        <StyledComment>
          <StyledLeftBracket>&quot;</StyledLeftBracket>
          {review.comment}
          <StyledRightBracket>&quot;</StyledRightBracket>
        </StyledComment>
      </StyledCommentWrapper>
    </StyledReview>
  );
};

Review.defaultProps = {
  size: "m",
};

export default Review;

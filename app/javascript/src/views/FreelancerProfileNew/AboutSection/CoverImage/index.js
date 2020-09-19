import React from "react";
import { rgba } from "polished";
import { Box, Circle, theme } from "@advisable/donut";
import { Plus } from "@styled-icons/feather";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  opacity: 0;
  transition: opacity 0.2s;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

function CoverImage() {
  return (
    <Wrapper>
      <IconWrapper>
        <Circle
          size={42}
          bg={rgba(theme.colors.neutral100, 0.8)}
          color="neutral900"
        >
          <Plus size={20} strokeWidth={2} />
        </Circle>
      </IconWrapper>
      <Box
        as="img"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/92b19080680791.5ce7e63751fcd.jpg"
        css="object-fit: cover;"
        width="100%"
        bg="neutral50"
        height="300px"
        mx="auto"
        borderRadius={12}
      />
    </Wrapper>
  );
}

export default CoverImage;

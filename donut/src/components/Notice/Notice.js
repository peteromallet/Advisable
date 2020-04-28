import React from "react";
import Box from "../Box";
import {
  StyledNotice,
  StyledNoticeIcon,
  StyledNoticeHeader,
  StyledNoticeContent,
} from "./styles";

const Notice = ({ icon, children, title, ...props }) => {
  return (
    <StyledNotice {...props}>
      {icon && <StyledNoticeIcon>{icon}</StyledNoticeIcon>}
      <Box>
        {title && (
          <StyledNoticeHeader
            mb="xxs"
            fontSize="s"
            color="orange.7"
            fontWeight="medium"
            letterSpacing="-0.01em"
          >
            {title}
          </StyledNoticeHeader>
        )}
        <StyledNoticeContent
          fontSize="s"
          color="orange.7"
          letterSpacing="-0.005em"
        >
          {children}
        </StyledNoticeContent>
      </Box>
    </StyledNotice>
  );
};

Notice.defaultProps = {
  padding: "s",
};

export default Notice;

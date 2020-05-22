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
        {title && <StyledNoticeHeader>{title}</StyledNoticeHeader>}
        <StyledNoticeContent>{children}</StyledNoticeContent>
      </Box>
    </StyledNotice>
  );
};

Notice.defaultProps = {
  variant: "neutral",
};

export default Notice;

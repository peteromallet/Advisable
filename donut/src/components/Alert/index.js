import React from "react";
import { AlertStyles, IconWrapper } from "./styles";
import Box from "../Box";
import Text from "../Text";

const Alert = ({ title, icon, children, ...props }) => {
  return (
    <AlertStyles {...props}>
      <Box display="flex" alignItems="center">
        {icon && (
          <Box mr="s">
            <IconWrapper>{icon}</IconWrapper>
          </Box>
        )}
        <Box>
          {title && (
            <Text mb="xxs" weight="medium">
              {title}
            </Text>
          )}
          {children}
        </Box>
      </Box>
    </AlertStyles>
  );
};

export default Alert;

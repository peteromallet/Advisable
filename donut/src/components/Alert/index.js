import React from "react";
import { AlertStyles, IconWrapper } from "./styles";
import Box from "../Box";
import Icon from "../Icon";
import Text from "../Text";

const Alert = ({ title, icon, children, ...props }) => {
  return (
    <AlertStyles {...props}>
      <Box display="flex" alignItems="center">
        {icon && (
          <Box mr="s">
            <IconWrapper>
              <Icon width={18} icon={icon} />
            </IconWrapper>
          </Box>
        )}
        <Box>
          {title && (
            <Text mb="xxs" weight="medium">
              {title}
            </Text>
          )}
          <Text size="s" lineHeight="s">
            {children}
          </Text>
        </Box>
      </Box>
    </AlertStyles>
  );
};

export default Alert;

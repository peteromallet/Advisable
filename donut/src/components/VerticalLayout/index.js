import React from "react";
import {
  StyledVerticalLayout,
  StyledVerticalLayoutHeader,
  StyledVerticalLayoutContent,
  StyledVerticalLayoutFooter,
} from "./styles";

// VerticalLayout is mostly used on mobile when you want to use a more 'typical'
// mobile style layout with a header and footer at the bottom.
const VeritcalLayout = ({ header, footer, children }) => {
  return (
    <StyledVerticalLayout>
      {header && (
        <StyledVerticalLayoutHeader>{header}</StyledVerticalLayoutHeader>
      )}
      <StyledVerticalLayoutContent>{children}</StyledVerticalLayoutContent>
      {footer && (
        <StyledVerticalLayoutFooter>{footer}</StyledVerticalLayoutFooter>
      )}
    </StyledVerticalLayout>
  );
};

export default VeritcalLayout;

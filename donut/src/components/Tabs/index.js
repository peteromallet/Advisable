import React from "react";
import Box from "../Box";
import { useTabState } from "reakit/Tab";
import { StyledTab, StyledTabList, StyledTabPanel } from "./styles";

const Tabs = ({ label, initialState, tabListProps, children }) => {
  const tab = useTabState({
    selectedId: "tab-0",
    ...initialState,
  });

  return (
    <>
      <StyledTabList {...tabListProps} {...tab} aria-label={label}>
        {React.Children.map(children, (child, i) => (
          <StyledTab {...tab} id={`tab-${i}`}>
            {child.props.icon && <Box mr="xs">{child.props.icon}</Box>}
            {child.props.title}
          </StyledTab>
        ))}
      </StyledTabList>
      {React.Children.map(children, (child, i) => (
        <StyledTabPanel {...tab} id={`tab-${i}`}>
          {React.cloneElement(child)}
        </StyledTabPanel>
      ))}
    </>
  );
};

Tabs.Tab = ({ children }) => {
  return children;
};

export default Tabs;

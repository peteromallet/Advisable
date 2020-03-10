import React from "react";
import Icon from "../Icon";
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
          <StyledTab {...tab} stopId={`tab-${i}`}>
            {child.props.icon && (
              <Icon
                mr="xs"
                width={18}
                strokeWidth={1.5}
                icon={child.props.icon}
              />
            )}
            {child.props.title}
          </StyledTab>
        ))}
      </StyledTabList>
      {React.Children.map(children, (child, i) => (
        <StyledTabPanel {...tab} stopId={`tab-${i}`}>
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

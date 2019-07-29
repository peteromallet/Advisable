import React from "react";
import Icon from "../Icon";
import { Tabs as TabStyles, TabList, Tab, TabPanels, TabPanel } from "./styles";

const Tabs = ({ tabListProps, children }) => {
  return (
    <TabStyles>
      <TabList {...tabListProps}>
        {React.Children.map(children, child => {
          return (
            <Tab>
              {child.props.icon && <Icon icon={child.props.icon} height={16} />}
              {child.props.title}
            </Tab>
          );
        })}
      </TabList>

      <TabPanels>
        {React.Children.map(children, child => {
          return <TabPanel>{child.props.children}</TabPanel>;
        })}
      </TabPanels>
    </TabStyles>
  );
};

Tabs.Tab = ({ children }) => {
  return children;
};

export default Tabs;

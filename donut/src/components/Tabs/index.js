import React from "react";
import Icon from "../Icon";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./styles";

const Component = ({ tabListProps, children }) => {
  return (
    <Tabs>
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
    </Tabs>
  );
};

Component.Tab = ({ children }) => {
  return children;
};

export default Component;

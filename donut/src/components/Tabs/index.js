import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

const Component = ({ children }) => {
  return (
    <Tabs>
      <TabList>
        {React.Children.map(children, child => {
          return <Tab>{child.props.title}</Tab>;
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

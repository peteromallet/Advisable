import * as React from "react";
import Layout from "../../components/Layout";
import NavigationMenu from "../../components/NavigationMenu";

const Navigation = () => {
  return (
    <Layout.Sidebar size="s">
      <NavigationMenu>
        <NavigationMenu.Item to="/profile/introduction" icon='user'>
          Introduction
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/profile/skills" icon="list">
          Skills
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/profile/references" icon="award">
          References
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/profile/location" icon="map-pin">
          Location
        </NavigationMenu.Item>
      </NavigationMenu>
    </Layout.Sidebar>
  );
};

export default Navigation;

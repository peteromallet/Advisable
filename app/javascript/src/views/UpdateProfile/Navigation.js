import * as React from "react";
import Sticky from "react-stickynode";
import { useBreakpoint } from "@advisable/donut";

import Layout from "../../components/Layout";
import NavigationMenu from "../../components/NavigationMenu";

const Navigation = () => {
  let mobileAndUp = useBreakpoint("sUp");

  return (
    <Layout.Sidebar size="s">
      <Sticky enabled={mobileAndUp} top={98}>
        <NavigationMenu>
          <NavigationMenu.Item to="/profile/introduction" icon="user">
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
          <NavigationMenu.Item to="/profile/payments" icon="dollar-sign">
            Payment Settings
          </NavigationMenu.Item>
        </NavigationMenu>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Navigation;

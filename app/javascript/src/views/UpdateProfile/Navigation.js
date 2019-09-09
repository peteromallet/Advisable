import * as React from "react";
import Sticky from "../../components/Sticky";
import { useBreakpoint } from "@advisable/donut";

import Layout from "../../components/Layout";
import NavigationMenu from "../../components/NavigationMenu";

const Navigation = () => {
  let mobileAndUp = useBreakpoint("sUp");

  return (
    <Layout.Sidebar size="s">
      <Sticky enabled={mobileAndUp} offset={98}>
        <NavigationMenu>
          <NavigationMenu.Item to="/profile" icon="user" exact>
            Introduction
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/references" icon="award">
            Previous Projects
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

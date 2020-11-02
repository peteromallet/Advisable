import * as React from "react";
import {
  PersonCircle,
  Card,
  Map,
  Copy,
  LockClosed,
} from "@styled-icons/ionicons-outline";
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
          <NavigationMenu.Item to="/profile" icon={<PersonCircle />} exact>
            Introduction
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/references" icon={<Copy />}>
            Previous Projects
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/location" icon={<Map />}>
            Location
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/payments" icon={<Card />}>
            Payment Settings
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/password" icon={<LockClosed />}>
            Password
          </NavigationMenu.Item>
        </NavigationMenu>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Navigation;

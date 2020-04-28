import * as React from "react";
import { User, Award, MapPin, DollarSign } from "@styled-icons/feather";
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
          <NavigationMenu.Item to="/profile" icon={<User />} exact>
            Introduction
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/references" icon={<Award />}>
            Previous Projects
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/location" icon={<MapPin />}>
            Location
          </NavigationMenu.Item>
          <NavigationMenu.Item to="/profile/payments" icon={<DollarSign />}>
            Payment Settings
          </NavigationMenu.Item>
        </NavigationMenu>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Navigation;

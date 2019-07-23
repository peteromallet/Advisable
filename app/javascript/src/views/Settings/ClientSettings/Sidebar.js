import React from "react";
import Layout from "../../../components/Layout";
import NavigationMenu from "../../../components/NavigationMenu";

const Sidebar = () => {
  return (
    <Layout.Sidebar size="s">
      <NavigationMenu title="Settings">
        <NavigationMenu.Item to="/settings/payments" icon="credit-card">
          Payment Preferences
        </NavigationMenu.Item>
      </NavigationMenu>
    </Layout.Sidebar>
  );
};

export default Sidebar;

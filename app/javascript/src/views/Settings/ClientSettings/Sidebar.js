import React from "react";
import { CreditCard } from "@styled-icons/feather";
import Layout from "../../../components/Layout";
import NavigationMenu from "../../../components/NavigationMenu";

const Sidebar = () => {
  return (
    <Layout.Sidebar size="s">
      <NavigationMenu title="Settings">
        <NavigationMenu.Item
          to="/settings/payments"
          icon={<CreditCard size={20} strokeWidth={2} />}
        >
          Payment Preferences
        </NavigationMenu.Item>
      </NavigationMenu>
    </Layout.Sidebar>
  );
};

export default Sidebar;

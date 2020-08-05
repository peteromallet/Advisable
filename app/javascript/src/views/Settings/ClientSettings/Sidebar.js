import React from "react";
import { CreditCard, FileText, Settings } from "@styled-icons/feather";
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
          Payments
        </NavigationMenu.Item>
        <NavigationMenu.Item
          to="/settings/invoices"
          icon={<FileText size={20} strokeWidth={2} />}
        >
          Invoices
        </NavigationMenu.Item>
        <NavigationMenu.Item
          to="/settings/account"
          icon={<Settings size={20} strokeWidth={2} />}
        >
          Account
        </NavigationMenu.Item>
      </NavigationMenu>
    </Layout.Sidebar>
  );
};

export default Sidebar;

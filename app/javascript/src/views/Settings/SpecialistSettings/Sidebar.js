import React from "react";
import styled from "styled-components";
import { Calendar } from "@styled-icons/ionicons-outline/Calendar";
import { Card } from "@styled-icons/ionicons-outline/Card";
import { LockClosed } from "@styled-icons/ionicons-outline/LockClosed";
import { PersonCircle } from "@styled-icons/ionicons-outline/PersonCircle";
import { Text } from "@advisable/donut";
import NavigationMenu from "src/components/NavigationMenu";
import View from "src/components/View";

const SidebarTitle = styled.div`
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const SettingsSidebar = () => {
  return (
    <View.Sidebar>
      <Text
        as={SidebarTitle}
        fontSize="xl"
        color="blue900"
        fontWeight="medium"
        mb="s"
        mt="xxs"
        ml="xs"
      >
        Settings
      </Text>
      <NavigationMenu title="Settings">
        <NavigationMenu.Item to="/settings/general" icon={<PersonCircle />}>
          General
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/availability" icon={<Calendar />}>
          Availability
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/payment-settings" icon={<Card />}>
          Payment Settings
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/password" icon={<LockClosed />}>
          Account
        </NavigationMenu.Item>
      </NavigationMenu>
    </View.Sidebar>
  );
};

export default SettingsSidebar;

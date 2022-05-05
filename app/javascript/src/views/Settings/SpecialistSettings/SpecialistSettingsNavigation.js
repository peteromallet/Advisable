import React from "react";
import { PersonCircle } from "@styled-icons/ionicons-outline/PersonCircle";
import { Text } from "@advisable/donut";
import {
  User,
  CreditCard,
  Calendar,
  LockClosed,
  Bell,
} from "@styled-icons/heroicons-outline";
import NavigationMenu from "src/components/NavigationMenu";

const SpecialistSettingsNavigation = () => {
  return (
    <>
      <Text
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
        <NavigationMenu.Item to="/settings/account" icon={<User />}>
          Account
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/general" icon={<PersonCircle />}>
          General
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/availability" icon={<Calendar />}>
          Availability
        </NavigationMenu.Item>
        <NavigationMenu.Item
          to="/settings/payment-settings"
          icon={<CreditCard />}
        >
          Payment Settings
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/notifications" icon={<Bell />}>
          Notifications
        </NavigationMenu.Item>
        <NavigationMenu.Item to="/settings/password" icon={<LockClosed />}>
          Password
        </NavigationMenu.Item>
      </NavigationMenu>
    </>
  );
};

export default SpecialistSettingsNavigation;

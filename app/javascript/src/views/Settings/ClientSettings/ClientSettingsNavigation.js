import React from "react";
import NavigationMenu from "../../../components/NavigationMenu";
import styled from "styled-components";
import { Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import {
  User,
  CreditCard,
  Document,
  LockClosed,
  UserGroup,
} from "@styled-icons/heroicons-outline";

const SidebarTitle = styled.div`
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const ClientSettingsNavigation = () => {
  const viewer = useViewer();

  return (
    <>
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
        {viewer.isTeamManager ? (
          <>
            <NavigationMenu.Item to="/settings/account" icon={<User />}>
              Account
            </NavigationMenu.Item>
            <NavigationMenu.Item to="/settings/payments" icon={<CreditCard />}>
              Payments
            </NavigationMenu.Item>
            <NavigationMenu.Item to="/settings/team" icon={<UserGroup />}>
              Team Members
            </NavigationMenu.Item>
            <NavigationMenu.Item to="/settings/invoices" icon={<Document />}>
              Invoices
            </NavigationMenu.Item>
          </>
        ) : null}
        <NavigationMenu.Item to="/settings/password" icon={<LockClosed />}>
          Password
        </NavigationMenu.Item>
      </NavigationMenu>
    </>
  );
};

export default ClientSettingsNavigation;

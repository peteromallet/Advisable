import React from "react";
import { Card } from "@styled-icons/ionicons-outline/Card";
import { Document } from "@styled-icons/ionicons-outline/Document";
import { LockClosed } from "@styled-icons/ionicons-outline/LockClosed";
import { PeopleCircle } from "@styled-icons/ionicons-outline/PeopleCircle";
import NavigationMenu from "../../../components/NavigationMenu";
import styled from "styled-components";
import { Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

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
            <NavigationMenu.Item to="/settings/payments" icon={<Card />}>
              Payments
            </NavigationMenu.Item>
            <NavigationMenu.Item to="/settings/team" icon={<PeopleCircle />}>
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

import React from "react";
import { padding } from "styled-system";
import { motion } from "framer-motion";
import { Card } from "@styled-icons/ionicons-outline/Card";
import { Document } from "@styled-icons/ionicons-outline/Document";
import { LockClosed } from "@styled-icons/ionicons-outline/LockClosed";
import { PeopleCircle } from "@styled-icons/ionicons-outline/PeopleCircle";
import NavigationMenu from "../../../components/NavigationMenu";
import styled from "styled-components";
import { Text, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

const SidebarContainer = styled.div`
  width: 280px;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SidebarTitle = styled.div`
  @media (max-width: 900px) {
    margin-left: 0;
  }
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 280px;
  position: fixed;
  height: calc(100vh - 60px);
  background: white;
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);

  @media (max-width: 900px) {
    position: relative;
    height: auto;
    background: none;
    box-shadow: none;
    top: 0;
    width: 100%;
    padding: 0 0 20px 0;
  }

  ${padding};
`;

const SettingsSidebar = () => {
  const viewer = useViewer();
  const isDesktop = useBreakpoint("lUp");

  return (
    <SidebarContainer>
      <Sidebar
        as={isDesktop ? motion.div : "div"}
        padding="m"
        initial={{ opacity: 0, left: -100 }}
        animate={{ opacity: 1, left: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </Sidebar>
    </SidebarContainer>
  );
};

export default SettingsSidebar;

// Renders the sidebar in the freelancer active application view.
import React from "react";
import Sticky from "react-stickynode";
import Back from "../../components/Back";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import Padding from "../../components/Spacing/Padding";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";

const Component = ({ data }) => {
  const isMobile = useMobile();
  const application = data.application;

  return (
    <Layout.Sidebar>
      <Sticky top={98} enabled={!isMobile}>
        <Padding bottom="xl">
          <Back to="/clients">All Clients</Back>
        </Padding>
        <Heading level={3}>{application.project.primarySkill}</Heading>
        <Text>{application.project.user.companyName}</Text>
        <Padding top="l" bottom="l">
          <AttributeList>
            <AttributeList.Item label="Hourly Rate" value="€120" />
          </AttributeList>
        </Padding>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Component;

import React from "react";
import { get } from "lodash";
import Sticky from "react-stickynode";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import currency from "../../utilities/currency";
import { Padding } from "../../components/Spacing";
import { FadeIn } from "../../components/Animation";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";

export default ({ data }) => {
  const isMobile = useMobile();
  const application = data.application;
  const project = application.project;
  const specialist = application.specialist;

  return (
    <Layout.Sidebar size="m">
      <Sticky top={98} enabled={!isMobile}>
        <FadeIn duration="500ms">
          <Padding bottom="l">
            <Avatar
              size="l"
              name={specialist.name}
              url={get(specialist, "image.url")}
            />
          </Padding>
          <Heading level={3}>{specialist.name}</Heading>
          <Text size="xs">
            {specialist.city}
            {specialist.country && `, ${specialist.country.name}`}
          </Text>
          <Padding top="m" bottom="l">
            <AttributeList>
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(application.rate, project.currency)}
              />
            </AttributeList>
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

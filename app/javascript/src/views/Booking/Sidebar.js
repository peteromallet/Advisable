import  React from "react";
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
  const booking = data.booking
  const application = booking.application;
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
              url={specialist.image.url}
            />
          </Padding>
          <Heading level={3}>{specialist.name}</Heading>
          <Padding bottom="s">
            <Text size="xs">
              {specialist.city}
              {specialist.country && `, ${specialist.country.name}`}
            </Text>
          </Padding>
          <AttributeList>
            <AttributeList.Item
              label="Hourly Rate"
              value={currency(booking.rate, booking.currency)}
            />
          </AttributeList>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

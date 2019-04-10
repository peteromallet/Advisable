import * as React from "react";
import { get } from "lodash";
import Sticky from "react-stickynode";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import currency from "../../utilities/currency";
import { Padding } from "../../components/Spacing";
import { FadeIn } from "../../components/Animation";
import StarRating from "../../components/StarRating";
import FeaturedBadge from "../../components/FeaturedBadge";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";

const Sidebar = ({ data }) => {
  const isMobile = useMobile();
  const application = data.booking.application;
  const project = application.project;
  const specialist = application.specialist;

  return (
    <Layout.Sidebar>
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
          <Padding bottom="xl">
            <Text size="xs">
              {specialist.city}
              {specialist.country && `, ${specialist.country.name}`}
            </Text>
          </Padding>
          {get(specialist, "ratings.overall") && (
            <Padding bottom="l">
              <StarRating size="l" rating={specialist.ratings.overall} />
            </Padding>
          )}
          {application.featured && (
            <Padding top="s" bottom="xl">
              <FeaturedBadge leftAligned />
            </Padding>
          )}
          <AttributeList>
            <AttributeList.Item
              label="Hourly Rate"
              value={currency(application.rate, project.currency)}
            />
            <AttributeList.Item
              label="Available"
              value={application.availability}
            />
            {specialist.linkedin && (
              <AttributeList.Item
                label="Linkedin"
                value={
                  <a href={specialist.linkedin} target="_blank">
                    View on Linkedin
                  </a>
                }
              />
            )}
          </AttributeList>
          <Padding top="xl">
            <ButtonGroup fullWidth stack>
              <Button styling="primary">
                Start working with {specialist.firstName}
              </Button>
              <Button>View application</Button>
              <Button>Reject proposal</Button>
            </ButtonGroup>
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Sidebar;

import * as React from "react";
import Sticky from "react-stickynode";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import currency from "../../utilities/currency";
import { Padding } from "../../components/Spacing";
import { FadeIn } from "../../components/Animation";
import StarRating from "../../components/StarRating";
import FeaturedBadge from "../../components/FeaturedBadge";
import AttributeList from "../../components/AttributeList";
import CandidateActions from "../../components/CandidateActions";
import { useMobile } from "../../components/Breakpoint";

export default ({ data, history }) => {
  const isMobile = useMobile();
  const project = data.project;
  const application = project.application;
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
          <Padding bottom="l">
            <StarRating size="l" rating={3} />
          </Padding>
          {data.project.application.featured && (
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
          <Padding top="xl" bottom="xl">
            <CandidateActions
              stack
              fullWidth
              application={application}
              history={history}
            />
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

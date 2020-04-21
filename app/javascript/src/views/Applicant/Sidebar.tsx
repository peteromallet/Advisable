import * as React from "react";
import { get } from "lodash-es";
import { Route } from "react-router-dom";
import Sticky from "../../components/Sticky";
import { Text, Padding } from "../../../../../donut/src";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import { FadeIn } from "../../components/Animation";
import StarRating from "../../components/StarRating";
import FeaturedBadge from "../../components/FeaturedBadge";
import CandidateActions from "../../components/CandidateActions";
import { useMobile } from "../../components/Breakpoint";
import ProposalActions from "./ProposalActions";
import CandidateAttributeList from "../../components/CandidateAttributeList";

export default ({ data, match }) => {
  const isMobile = useMobile();
  const project = data.project;
  const application = project.application;
  const specialist = application.specialist;

  return (
    <Layout.Sidebar size="m">
      <Sticky offset={98} enabled={!isMobile}>
        <FadeIn duration="500ms">
          <Padding bottom="m">
            <Avatar
              size="l"
              name={specialist.name}
              url={get(specialist, "image.url")}
            />
          </Padding>
          <Padding bottom="xxs">
            <Text
              size="xxl"
              as="h3"
              fontWeight="semibold"
              color="neutral.N9"
              letterSpacing="-0.01rem"
            >
              {specialist.name}
            </Text>
          </Padding>
          <Padding bottom="m">
            <Text size="xs" color="neutral.N6">
              {specialist.city}
              {specialist.country && `, ${specialist.country.name}`}
            </Text>
          </Padding>
          {get(specialist, "ratings.overall") && (
            <Padding bottom="l">
              <StarRating size="l" rating={specialist.ratings.overall} />
            </Padding>
          )}
          {data.project.application.featured && (
            <Padding top="s" bottom="xl">
              <FeaturedBadge leftAligned />
            </Padding>
          )}
          <CandidateAttributeList application={application} />
          <Padding top="l" bottom="xl">
            <Route
              path={match.path}
              exact
              render={() => (
                <CandidateActions
                  stack
                  fullWidth
                  projectId={data.project.airtableId}
                  application={application}
                />
              )}
            />
            <Route
              path={`${match.path}/proposal`}
              exact
              render={() => (
                <ProposalActions
                  specialist={specialist}
                  application={application}
                />
              )}
            />
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

import * as React from "react";
import { get } from "lodash-es";
import { Route } from "react-router-dom";
import { Box } from "@advisable/donut";
import Sticky from "../../components/Sticky";
import { Text } from "../../../../../donut/src";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import { FadeIn } from "../../components/Animation";
import StarRating from "../../components/StarRating";
import FeaturedBadge from "../../components/FeaturedBadge";
import CandidateActions from "../../components/CandidateActions";
import { useMobile } from "../../components/Breakpoint";
import ProposalActions from "./ProposalActions";
import CandidateAttributeList from "../../components/CandidateAttributeList";

export default function Sidebar({ data, match }) {
  const isMobile = useMobile();
  const project = data.project;
  const application = project.application;
  const specialist = application.specialist;

  return (
    <Layout.Sidebar size="m">
      <Sticky offset={98} enabled={!isMobile}>
        <FadeIn duration="500ms">
          <Box paddingBottom="m">
            <Avatar
              size="l"
              name={specialist.name}
              url={get(specialist, "image.url")}
            />
          </Box>
          <Box paddingBottom="xxs">
            <Text
              size="xxl"
              as="h3"
              fontWeight="semibold"
              color="neutral.N9"
              letterSpacing="-0.01rem"
            >
              {specialist.name}
            </Text>
          </Box>
          <Box paddingBottom="m">
            <Text size="xs" color="neutral.N6">
              {specialist.city}
              {specialist.country && `, ${specialist.country.name}`}
            </Text>
          </Box>
          {get(specialist, "ratings.overall") && (
            <Box paddingBottom="l">
              <StarRating size="l" rating={specialist.ratings.overall} />
            </Box>
          )}
          {data.project.application.featured && (
            <Box paddingTop="s" paddingBottom="xl">
              <FeaturedBadge leftAligned />
            </Box>
          )}
          <CandidateAttributeList application={application} />
          <Box paddingTop="l" paddingBottom="xl">
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
          </Box>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
}

import React from "react";
import * as Sentry from "@sentry/react";
import { Box, Text } from "@advisable/donut";
import Loading from "./Loading";
import FeaturedMembersList from "./FeaturedMembersList";

const FeaturedMembers = ({ featuredMembers, loading }) => (
  <Sentry.ErrorBoundary fallback={null}>
    <Box pb="12">
      <Text
        fontSize="xs"
        marginBottom="6"
        color="neutral600"
        fontWeight="medium"
        textTransform="uppercase"
      >
        Featured Members
      </Text>

      {loading ? <Loading /> : null}
      {!loading && featuredMembers ? (
        <FeaturedMembersList featuredMembers={featuredMembers} />
      ) : null}
    </Box>
  </Sentry.ErrorBoundary>
);

export default React.memo(FeaturedMembers);

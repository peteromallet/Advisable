import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Circle,
  Text,
  Icon,
  Container,
  RoundedButton,
  theme,
} from "@advisable/donut";

function RecommendationBar({ data }) {
  const location = useLocation();
  const search = data.search;
  const specialist = data.search.recommendation.specialist;
  return (
    <Box
      width="100%"
      left={0}
      bottom={0}
      zIndex={5}
      height="70px"
      bg="white.9"
      boxShadow="l"
      position="fixed"
    >
      <Container height="100%" display="flex" alignItems="center">
        <Box>
          <Circle width="40px" height="40px" bg="blue100" flexShrink="0">
            <Icon icon="zap" strokeWidth={0} fill={theme.colors.blue800} />
          </Circle>
        </Box>
        <Box width="100%" flexShrink={1} px="s">
          <Box maxWidth="500px">
            <Text fontSize="xs" lineHeight="s">
              Because {specialist.firstName} is a recommended freelancer, we
              offer an expanded 3-day money-back guarantee with them.
            </Text>
          </Box>
        </Box>
        <Box flexShrink={0}>
          <RoundedButton
            as={Link}
            to={`/freelancer_search/${search.id}/results`}
            variant="subtle"
            size="l"
          >
            See other mathes
          </RoundedButton>
          <RoundedButton
            as={Link}
            prefix={<Icon icon="message-circle" />}
            to={{
              ...location,
              pathname: `/freelancer_search/${search.id}/topic`,
              state: {
                freelancers: [specialist.id],
              },
            }}
            size="l"
            ml="xs"
          >
            Talk with {specialist.firstName}
          </RoundedButton>
        </Box>
      </Container>
    </Box>
  );
}

export default RecommendationBar;

import { useHistory, useLocation } from "react-router-dom";
import { Box, Button } from "@advisable/donut";
import { MessageCircle } from "@styled-icons/feather";

export default function RecommendationAction({
  search,
  firstName,
  specialistID,
}) {
  const history = useHistory();
  const location = useLocation();
  return (
    <Box flexShrink={0}>
      <Button
        size="l"
        mb={{ _: "xs", l: 0 }}
        width={{ _: "100%", l: "auto" }}
        onClick={() => history.push(`/freelancer_search/${search.id}/results`)}
        variant="subtle"
      >
        See other matches
      </Button>
      <Button
        size="l"
        ml={{ _: null, l: "xs" }}
        width={{ _: "100%", l: "auto" }}
        prefix={<MessageCircle />}
        onClick={() =>
          history.push({
            ...location,
            pathname: `/freelancer_search/${search.id}/availability`,
            state: {
              freelancers: [specialistID],
            },
          })
        }
      >
        {`Talk with ${firstName}`}
      </Button>
    </Box>
  );
}

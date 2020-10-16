import RecommendationOffer from "./RecommendationOffer";
import RecommendationActions from "./RecommendationActions";
import { Box, Container } from "@advisable/donut";

function RecommendationBar({ data }) {
  const search = data.search;
  const specialist = data.search.recommendation.specialist;
  return (
    <Box
      width="100%"
      left={0}
      bottom={0}
      zIndex={5}
      height="70px"
      bg="white"
      boxShadow="l"
      position="fixed"
      display={{ _: "none", l: "block" }}
    >
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <RecommendationOffer firstName={specialist.firstName} />
        <RecommendationActions
          search={search}
          specialistID={specialist.id}
          firstName={specialist.firstName}
        />
      </Container>
    </Box>
  );
}

export default RecommendationBar;

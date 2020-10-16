import { Container, Box, Text } from "@advisable/donut";
import couch from "../../illustrations/couch.png";
import CurrentlyOnHold from "./CurrentlyOnHold";
import SimilarProjects from "./SimilarProjects";
import FullApplicationCard from "./FullApplicationCard";

function AccountOnHold() {
  return (
    <Container maxWidth="750px">
      <Box textAlign="center" mb="40px">
        <img src={couch} width="320" height="256" />
        <Text
          mb="8px"
          color="blue900"
          fontSize="24px"
          fontWeight="medium"
          letterSpacing="-0.03em"
        >
          Your account is currently on hold
        </Text>
        <Box maxWidth="400px" mx="auto">
          <Text fontSize="15px" lineHeight="1.4em" color="neutral700">
            We have receieved your initial application and are looking for a
            first project for you
          </Text>
        </Box>
      </Box>

      <Box
        display="grid"
        gridGap="32px"
        gridTemplateColumns={["1fr", "1fr 1fr"]}
      >
        <Box>
          <CurrentlyOnHold />
        </Box>
        <Box>
          <FullApplicationCard />
        </Box>
      </Box>

      <Box py="80px">
        <SimilarProjects />
      </Box>
    </Container>
  );
}

export default AccountOnHold;

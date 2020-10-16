import { Search } from "@styled-icons/feather";
import RequestCallButton from "../RequestCallButton";
import { Link as RouterLink } from "react-router-dom";
import { Circle, Box, Text, Button } from "@advisable/donut";

const NoResults = ({ data }) => {
  return (
    <Box textAlign="center" maxWidth={500} mx="auto">
      <Circle mb="m" bg="blue100" size={60} color="blue700">
        <Search size={24} strokeWidth={2} />
      </Circle>
      <Text fontSize="l" fontWeight="semibold" mb="xs">
        No results
      </Text>
      <Text mb="m" lineHeight="m" fontSize="s" color="neutral800">
        We couldn&apos;t find any &quot;{data.search.skill.name}&quot;
        freelancers. Make another search or request a call with an Advisable
        project manager and we’ll identify the perfect person for you.
      </Text>
      <Button
        mr="s"
        as={RouterLink}
        variant="secondary"
        to="/freelancer_search"
        prefix={<Search />}
      >
        Make another search
      </Button>
      <RequestCallButton>Request a call</RequestCallButton>
    </Box>
  );
};

export default NoResults;

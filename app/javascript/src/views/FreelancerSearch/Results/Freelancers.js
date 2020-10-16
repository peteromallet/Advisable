import { Search, ArrowLeft, Check, Plus } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Text, Link, Button } from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import SpecialistCard from "../../../components/SpecialistCard";
import SelectionBar from "./SelectionBar";

const Freelancers = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const selectedFreelancers = location.state?.freelancers || [];

  const skill = data.search.skill.name;
  const results = data.search.results;

  const handleClickFreelancer = (specialist) => () => {
    let nextSelected;
    if (selectedFreelancers.indexOf(specialist.id) > -1) {
      nextSelected = selectedFreelancers.filter((s) => s !== specialist.id);
    } else {
      nextSelected = [...selectedFreelancers, specialist.id];
    }

    history.replace({
      ...location,
      state: {
        ...location.state,
        freelancers: nextSelected,
      },
    });
  };

  return (
    <Box>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Link
          fontSize="l"
          mb="s"
          fontWeight="medium"
          to="/freelancer_search"
          letterSpacing="-0.02em"
        >
          <Box display="inline-block" mr="2px">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text
          as="h2"
          mb="xs"
          color="blue800"
          fontSize="26px"
          lineHeight="24px"
          fontWeight="semibold"
          letterSpacing="-0.035em"
        >
          We found {results.nodes.length} {skill} freelancers
        </Text>
        <Text
          mb="l"
          fontSize="l"
          lineHeight="s"
          color="neutral800"
          letterSpacing="-0.01em"
        >
          Please select the freelancers you would like to request a consultation
          with.
        </Text>
      </motion.div>
      <Box flexWrap="wrap" display="flex" ml="-10px" mr="-10px">
        {results.nodes.map((s) => (
          <Box key={s.id} width={{ _: "100%", s: "50%", l: "33.3333%" }}>
            <SpecialistCard
              mx="10px"
              mb="20px"
              height={480}
              specialist={s}
              elevation={selectedFreelancers.indexOf(s.id) > -1 ? "l" : "m"}
              border="2px solid white"
              borderColor={selectedFreelancers.indexOf(s.id) > -1 && "blue600"}
              action={
                <Button
                  aria-label={`Select ${s.name}`}
                  onClick={handleClickFreelancer(s)}
                  variant={
                    selectedFreelancers.indexOf(s.id) > -1 ? "primary" : "dark"
                  }
                  prefix={
                    selectedFreelancers.indexOf(s.id) > -1 ? (
                      <Check />
                    ) : (
                      <Plus />
                    )
                  }
                >
                  {selectedFreelancers.indexOf(s.id) > -1 ? "Added" : "Add"}
                </Button>
              }
            />
          </Box>
        ))}
      </Box>
      <Box height={1} width={200} bg="neutral200" my="xl" mx="auto" />
      <Box maxWidth={500} mx="auto" textAlign="center" mb="xxl">
        <Text mb="xs" fontWeight="semibold">
          Don’t see anyone you like?
        </Text>
        <Text mb="m" lineHeight="m" fontSize="s">
          Make another search or request a call with an Advisable project
          manager and we’ll identify the perfect person for you.
        </Text>
        <RouterLink to="/freelancer_Search">
          <Button mr="s" variant="secondary" prefix={<Search />}>
            Make another search
          </Button>
        </RouterLink>
        <RequestCallButton>Request a call</RequestCallButton>
      </Box>
      <SelectionBar
        search={data.search}
        specialists={results.nodes.filter(
          (s) => selectedFreelancers.indexOf(s.id) > -1,
        )}
      />
    </Box>
  );
};

export default Freelancers;

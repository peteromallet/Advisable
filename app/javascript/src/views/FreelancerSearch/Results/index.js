import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-apollo";
import { useLocation, useHistory, Link as RouterLink } from "react-router-dom";
import { Box, Text, Icon, Link, RoundedButton } from "@advisable/donut";
import Loading from "./Loading";
import QUERY from "./searchQuery";
import NoResults from "./NoResults";
import SelectionBar from "./SelectionBar";
import RequestCallButton from "../RequestCallButton";
import SpecialistCard from "../../../components/SpecialistCard";

const Results = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location.state?.search;

  const { data, loading, error } = useQuery(QUERY, {
    skip: Boolean(!search),
    variables: {
      skill: search?.skill,
      industry: search?.industryRequired ? search?.industry : null,
      companyType: search?.companyTypeRequired ? search?.companyType : null,
    },
  });

  if (!location.state?.search) {
    history.replace("/freelancer_search");
  }

  if (error) {
    return <>something went wrong</>;
  }

  if (loading) return <Loading />;

  if (data.specialists.nodes.length === 0) {
    return <NoResults />;
  }

  const selectedFreelancers = location.state.freelancers || [];

  const handleClickFreelancer = specialist => e => {
    let nextSelected;
    if (selectedFreelancers.indexOf(specialist.id) > -1) {
      nextSelected = selectedFreelancers.filter(s => s !== specialist.id);
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
      <Link variant="subtle" mb="xs" to="/freelancer_search">
        <Icon icon="arrow-left" width={16} height={16} mr="xxs" /> Back
      </Link>
      <Text
        as="h2"
        mb="xxs"
        fontSize="xxl"
        lineHeight="xl"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        We found {data.specialists.nodes.length} {search.skill} freelancers
      </Text>
      <Text mb="l" color="neutral.7">
        Select the freelancers you would like to request a consultation with.
      </Text>
      <Box display="flex" flexWrap="wrap" ml="-10px" mr="-10px">
        {data.specialists.nodes.map((s, i) => (
          <Box
            as={motion.div}
            key={s.id}
            width="33.3333%"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: (i + 1) * 0.14 }}
          >
            <SpecialistCard
              mx={10}
              mb={20}
              height={470}
              specialist={s}
              elevation={selectedFreelancers.indexOf(s.id) > -1 ? "l" : "m"}
              border="2px solid white"
              borderColor={selectedFreelancers.indexOf(s.id) > -1 && "blue.6"}
              footer={
                <RoundedButton
                  onClick={handleClickFreelancer(s)}
                  variant={
                    selectedFreelancers.indexOf(s.id) > -1
                      ? "primary"
                      : "subtle"
                  }
                  prefix={
                    <Icon
                      icon={
                        selectedFreelancers.indexOf(s.id) > -1
                          ? "check"
                          : "plus"
                      }
                    />
                  }
                >
                  {selectedFreelancers.indexOf(s.id) > -1 ? "Added" : "Add"}
                </RoundedButton>
              }
            />
          </Box>
        ))}
      </Box>
      <Box height={1} width={200} bg="neutral.2" my="xl" mx="auto" />
      <Box maxWidth={500} mx="auto" textAlign="center" mb="xxl">
        <Text mb="xs" fontWeight="semibold">
          Don’t see anyone you like?
        </Text>
        <Text mb="m" lineHeight="m" fontSize="s">
          Make another search or request a call with an Advisable project
          manager and we’ll identify the perfect person for you.
        </Text>
        <RoundedButton
          mr="s"
          as={RouterLink}
          variant="secondary"
          to="/freelancer_search"
          prefix={<Icon icon="search" />}
        >
          Make another search
        </RoundedButton>
        <RequestCallButton>Request a call</RequestCallButton>
      </Box>
      <SelectionBar />
    </Box>
  );
};

export default Results;

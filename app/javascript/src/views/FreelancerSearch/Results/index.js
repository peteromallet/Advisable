import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-apollo";
import { useLocation, useHistory, Link as RouterLink } from "react-router-dom";
import { Box, Text, Icon, Link, RoundedButton } from "@advisable/donut";
import Loading from "./Loading";
import QUERY from "./searchQuery";
import NoResults from "./NoResults";
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
            <SpecialistCard specialist={s} elevation="l" mx={10} mb={20} />
          </Box>
        ))}
      </Box>
      <Box height={1} width={200} bg="neutral.2" my="xl" mx="auto" />
      <Box maxWidth={500} mx="auto" textAlign="center" mb="l">
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
        <RoundedButton variant="secondary" prefix={<Icon icon="phone" />}>
          Request a call
        </RoundedButton>
      </Box>
    </Box>
  );
};

export default Results;

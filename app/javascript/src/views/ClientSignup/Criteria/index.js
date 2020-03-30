import React from "react";
import queryString from "query-string";
import { useQuery } from "@apollo/react-hooks";
import { Box, Text, useTheme } from "@advisable/donut";
import { useLocation, useHistory } from "react-router-dom";
import Loading from "./Loading";
import GET_DATA from "./getData";
import CriteriaForm from "./CriteriaForm";
import Testimonials from "./Testimonials";
import AlternativeCriteriaForm from "./AlternativeCriteriaForm";

function Criteria() {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const { loading, data } = useQuery(GET_DATA);
  const queryParams = queryString.parse(location.search, {
    parseBooleans: true,
  });

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  const handleSubmit = (search) => {
    history.push({
      pathname: "/clients/signup/specialists",
      search: queryString.stringify({ ...queryParams, ...search }),
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box paddingRight={{ _: null, l: 550 }}>
      <Box py="xxl" maxWidth={600} margin="0 auto" px="m">
        <Text
          as="h2"
          mb="xs"
          color="blue.8"
          fontSize="xxxl"
          lineHeight="xxxl"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          Find the Perfect Freelancer
        </Text>
        <Box maxWidth={550} mb="xl">
          <Text color="neutral.9" lineHeight="m">
            Let us know what you are looking for so that we can find the perfect
            freelancer for you.
          </Text>
        </Box>
        {queryParams.alternative ? (
          <AlternativeCriteriaForm data={data} onSubmit={handleSubmit} />
        ) : (
          <CriteriaForm data={data} onSubmit={handleSubmit} />
        )}
      </Box>
      <Box display={{ _: "none", l: "block" }}>
        <Testimonials />
      </Box>
    </Box>
  );
}

export default Criteria;

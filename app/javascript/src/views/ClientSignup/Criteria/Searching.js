import React, { useEffect } from "react";
import { useQuery } from "react-apollo";
import { useHistory } from "react-router-dom";
import { Box, Text, useTheme } from "@advisable/donut";
import Logo from "../../../components/Logo";
import SearchingIndicator from "../../../components/SearchingIndicator";
import useInterval from "../../../hooks/useInterval";
import SEARCH from "./search";

const SECONDS = 3;

const Searching = ({ search }) => {
  const theme = useTheme();
  const history = useHistory();
  const [seconds, setSeconds] = React.useState(0);

  const variables = { skill: search.skill };

  if (search.industryRequired) {
    variables.industry = search.industry;
  }

  if (search.companyTypeRequired) {
    variables.companyType = search.companyType;
  }

  const { loading, data, error } = useQuery(SEARCH, { variables });

  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  useEffect(() => {
    if (!loading && seconds > SECONDS) {
      history.push({
        pathname: "/clients/signup/price_range",
        state: {
          search,
          selected: [],
          results: data.specialists,
        },
      });
    }
  }, [search, seconds, loading, data, history]);

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  return (
    <Box maxWidth={600} margin="0 auto" px="m">
      <Box py="xl">
        <Logo />
      </Box>

      <Box
        padding="xl"
        borderRadius={12}
        border="1px solid"
        textAlign="center"
        borderColor="neutral.1"
      >
        <Box mt="m" mb="xl">
          <SearchingIndicator />
        </Box>

        <Text fontSize="m" color="neutral.9" mb="xxs" fontWeight="medium">
          Looking for specialists...
        </Text>

        <Text fontSize="s" lineHeight="s" color="neutral.7">
          Please wait while we find specialists matching your criteria. This
          should only take a few seconds.
        </Text>
      </Box>
    </Box>
  );
};

export default Searching;

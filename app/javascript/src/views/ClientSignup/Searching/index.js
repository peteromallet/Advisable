import React, { useEffect } from "react";
import queryString from "query-string";
import { useQuery } from "react-apollo";
import { useLocation } from "react-router-dom";
import { Box, Text, useTheme } from "@advisable/donut";
import Logo from "../../../components/Logo";
import SearchingIndicator from "../../../components/SearchingIndicator";
import Testimonials from "../Testimonials";
import useInterval from "../../../hooks/useInterval";
import SEARCH from "./search";

const SECONDS = 4;

const Searching = ({ updateResults }) => {
  const theme = useTheme();
  const location = useLocation();
  const [seconds, setSeconds] = React.useState(0);
  const { skill } = queryString.parse(location.search);
  const { loading, data } = useQuery(SEARCH, {
    variables: { skill },
  });

  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  useEffect(() => {
    if (!loading && seconds > SECONDS) {
      updateResults(data);
    }
  }, [seconds, loading, updateResults, data]);

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  return (
    <Box paddingRight={{ _: null, l: 550 }}>
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
      <Box display={{ _: "none", l: "block" }}>
        <Testimonials />
      </Box>
    </Box>
  );
};

export default Searching;

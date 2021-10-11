import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Text } from "@advisable/donut";
import { Refresh } from "@styled-icons/heroicons-solid";
import illustration from "src/illustrations/zest/search.svg";
import pluralize from "src/utilities/pluralize";
import { useRefreshResults } from "../queries";
import { useParams } from "react-router";

export default function MoreResults({ count, onLoadMore }) {
  const { id } = useParams();
  const [loadMore, { loading }] = useRefreshResults();
  const isMax = count >= 5;
  const space = 5 - count;

  const handleLoadMore = () => {
    loadMore({
      variables: {
        input: { id },
      },
      update: onLoadMore,
    });
  };

  return (
    <Box
      as={motion.div}
      px={8}
      maxWidth="520px"
      paddingBottom={8}
      layoutId="moreResults"
      mx="auto"
      textAlign="center"
    >
      <img src={illustration} width="164px" />
      <Text
        fontSize="20px"
        fontWeight={600}
        marginBottom={2}
        marginTop="-8px"
        letterSpacing="-0.02rem"
      >
        Looking for more recommendations?
      </Text>
      <Text lineHeight="20px" marginBottom={8}>
        {isMax ? (
          <>
            In order to help you find the best candidate, we only show you five
            specialist’s at a time. When you remove a recommendation we will use
            your feedback to find you another one.
          </>
        ) : (
          <>
            You have space for{" "}
            {pluralize(space, "more recommendation", "more recommendations")} in
            this shortlist.
          </>
        )}
      </Text>
      <Button
        size="l"
        prefix={<Refresh />}
        disabled={isMax}
        onClick={handleLoadMore}
        loading={loading}
        variant={isMax ? "dark" : "primary"}
      >
        Discover more
      </Button>
    </Box>
  );
}

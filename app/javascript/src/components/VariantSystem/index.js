import { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Text, theme } from "@advisable/donut";
import { useApolloClient, gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { range } from "lodash-es";
import { useCallback } from "react";
import styled from "styled-components";

export const CURRENT_VARIANT = gql`
  query getCurrentVariant {
    variant @client
  }
`;

export const NUM_OF_VARIANTS = gql`
  query getNumOfVariants {
    numOfVariants @client
    variant @client
  }
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
  right: -48px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 80%;
  padding-left: 4%;
  padding-bottom: 5%;
  transition: right 0.2s;
  &:hover {
    right: 0;
  }
`;

const VariantButton = styled.div`
  user-select: none;
  border-radius: 16px 0 0 16px;
  cursor: pointer;
  transition: 0.1s transform;
  text-align: center;
  width: 48px;
  height: 32px;
  line-height: 32px;
  margin: 4px 0;
  border-width: 1px 0 1px 1px;
  border-style: solid;
  border-color: ${theme.colors.neutral300};
  background: white;

  &:hover {
    transform: scale(1.15);
  }

  &[data-active="true"] {
    border-color: ${theme.colors.neutral500};
    background: ${theme.colors.blue100};
  }
`;

function VariantSystem({ variantsRange }) {
  const { data } = useQuery(NUM_OF_VARIANTS);
  const activeVariant = data?.variant;

  const variants = useMemo(
    () =>
      range(variantsRange[0], variantsRange[1]).map((num) => (
        <Box
          as={VariantButton}
          key={`variant-${num}`}
          data-active={num === activeVariant}
          onClick={() => updateActiveVariant(num)}
        >
          <Text
            fontSize="xxs"
            color={num === activeVariant ? "neutral800" : "neutral400"}
          >
            {num}
          </Text>
        </Box>
      )),
    [activeVariant, updateActiveVariant, variantsRange],
  );

  const numOfVariants = variants.length;
  const { cache } = useApolloClient();

  const updateActiveVariant = useCallback((variant) => {
    cache.writeQuery({ query: CURRENT_VARIANT, data: { variant } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateActiveVariant(variantsRange[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cache.writeQuery({ query: NUM_OF_VARIANTS, data: { numOfVariants } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Wrapper>{variants}</Wrapper>;
}

VariantSystem.propTypes = {
  variantsRange: PropTypes.array,
};

export default VariantSystem;

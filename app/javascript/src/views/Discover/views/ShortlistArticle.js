import React from "react";
import truncate from "lodash/truncate";
import { Box, Text } from "@advisable/donut";
import Article from "src/components/Article";
import { useArticle } from "../queries";
import RecommendationAvatar from "../components/RecommendationAvatar";
import BackButton from "src/components/BackButton";
import { useParams } from "react-router";
import ConnectButton from "src/components/ConnectButton";

export default function ShortlistArticle() {
  const { id } = useParams();
  const { data, loading } = useArticle();

  if (loading) return <>loading</>;

  return (
    <>
      <Box display="flex">
        <Box width="200px" flexShrink={0}>
          <Box position="sticky" top="108px">
            <BackButton to={`/explore/${id}`} marginBottom={4} />
            <RecommendationAvatar
              size="sm"
              specialist={data.caseStudy.specialist}
            />
            <Text
              marginTop={5}
              marginBottom={2}
              fontSize="3xl"
              fontWeight={600}
              letterSpacing="-0.032em"
            >
              {data.caseStudy.specialist.name}
            </Text>
            <Text lineHeight="20px" color="neutral800" marginBottom={6}>
              {truncate(data.caseStudy.specialist.bio, { length: 110 })}
            </Text>
            <ConnectButton specialist={data.caseStudy.specialist} />
          </Box>
        </Box>
        <Box paddingLeft={12}>
          <Article article={data.caseStudy} />
        </Box>
      </Box>
    </>
  );
}

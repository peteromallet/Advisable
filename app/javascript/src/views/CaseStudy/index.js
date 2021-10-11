import React from "react";
import truncate from "lodash/truncate";
import { Box, Text } from "@advisable/donut";
import Article from "src/components/Article";
import { useArticle } from "./queries";
import RecommendationAvatar from "src/views/Discover/components/RecommendationAvatar";
import MessageFreelancerButton from "src/views/Discover/components/MessageButton";
import { Link } from "react-router-dom";
import Loading from "src/components/Loading";
import Page from "src/components/Page";

export default function CaseStudy() {
  const { data, loading } = useArticle();

  if (loading) return <Loading />;

  return (
    <Page width="960px">
      <Box
        paddingY={{ _: 8, m: 12 }}
        paddingX={{ _: 4, m: 8 }}
        display={{ _: "block", s: "flex" }}
      >
        <Box
          width={{ s: "200px" }}
          textAlign={{ _: "center", s: "left" }}
          flexShrink={0}
          marginBottom={12}
        >
          <Box position="sticky" top="108px">
            <Box
              display="flex"
              justifyContent={{ _: "center", s: "flex-start" }}
            >
              <RecommendationAvatar
                size="xs"
                src={data.caseStudy.specialist.avatar}
              />
            </Box>
            <Link
              to={`/freelancers/${data.caseStudy.specialist.id}`}
              target="_blank"
            >
              <Text
                marginTop={5}
                marginBottom={2}
                fontSize="3xl"
                fontWeight={600}
                letterSpacing="-0.032em"
                color="neutral900"
              >
                {data.caseStudy.specialist.name}
              </Text>
            </Link>
            <Text lineHeight="20px" color="neutral800" marginBottom={6}>
              {truncate(data.caseStudy.specialist.bio, { length: 110 })}
            </Text>
            <Box marginBottom={3}>
              <MessageFreelancerButton
                width={{ _: "100%", s: "auto" }}
                specialist={data.caseStudy.specialist}
              />
            </Box>
          </Box>
        </Box>
        <Box paddingLeft={{ _: 0, s: 12 }}>
          <Article article={data.caseStudy} />
        </Box>
      </Box>
    </Page>
  );
}

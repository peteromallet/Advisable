import React from "react";
import truncate from "lodash/truncate";
import css from "@styled-system/css";
import { Box, Text } from "@advisable/donut";
import Article from "src/components/Article";
import NotFound, { isNotFound } from "src/views/NotFound";
import { useArticle } from "../queries";
import RecommendationAvatar from "../components/RecommendationAvatar";
import BackButton from "src/components/BackButton";
import { useParams } from "react-router";
import MessageFreelancerButton from "../components/MessageButton";
import { Link } from "react-router-dom";
import Loading from "src/components/Loading";
import ConsultationStatus from "../components/ConsultationStatus";

export default function ShortlistArticle() {
  const { id } = useParams();
  const { data, loading, error } = useArticle();

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <>
      <Box display={{ _: "block", s: "flex" }}>
        <Box
          width={{ s: "200px" }}
          textAlign={{ _: "center", s: "left" }}
          flexShrink={0}
          marginBottom={12}
        >
          <Box position="sticky" top="108px">
            <BackButton to={`/explore/${id}`} marginBottom={4} />
            <Box
              display="flex"
              justifyContent={{ _: "center", s: "flex-start" }}
            >
              <RecommendationAvatar
                size="xs"
                src={data.caseStudy.specialist.avatar}
              />
            </Box>
            <Link to={data.caseStudy.specialist.profilePath}>
              <Text
                marginTop={5}
                marginBottom={2}
                fontSize="3xl"
                fontWeight={600}
                letterSpacing="-0.032em"
                color="neutral900"
                css={css({
                  "&:hover": {
                    textDecoration: "underline",
                  },
                })}
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
          <ConsultationStatus specialist={data.caseStudy.specialist} />
          <Article article={data.caseStudy} />
        </Box>
      </Box>
    </>
  );
}

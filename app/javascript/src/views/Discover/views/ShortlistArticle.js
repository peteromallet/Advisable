import React from "react";
import truncate from "lodash/truncate";
import { Box, Text } from "@advisable/donut";
import Article from "src/components/Article";
import { useArticle } from "../queries";
import RecommendationAvatar from "../components/RecommendationAvatar";
import BackButton from "src/components/BackButton";
import { useHistory, useParams } from "react-router";
import ArchiveButton from "../components/ArchiveButton";
import MessageFreelancerButton from "../components/MessageButton";

export default function ShortlistArticle() {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useArticle();

  if (loading) return <>loading</>;

  const handleArchive = () => {
    history.push(`/explore/${id}`);
  };

  return (
    <>
      <Box display="flex">
        <Box width="200px" flexShrink={0}>
          <Box position="sticky" top="108px">
            <BackButton to={`/explore/${id}`} marginBottom={4} />
            <RecommendationAvatar
              size="sm"
              src={data.caseStudy.specialist.avatar}
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
            <Box marginBottom={3}>
              <MessageFreelancerButton specialist={data.caseStudy.specialist} />
            </Box>
            <ArchiveButton
              article={data.caseStudy}
              search={data.caseStudySearch}
              onArchive={handleArchive}
            />
          </Box>
        </Box>
        <Box paddingLeft={12}>
          <Article article={data.caseStudy} />
        </Box>
      </Box>
    </>
  );
}

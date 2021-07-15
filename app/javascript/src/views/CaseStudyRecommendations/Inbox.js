import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Text, Button } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useParams } from "react-router-dom";
import { useCaseStudySearch } from "./queries";
import inbox from "src/illustrations/inbox.svg";
import postbox from "src/illustrations/postbox.svg";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import ViewLoading from "./ViewLoading";
import DeleteSearch from "./DeleteSearch";
import commaSeparated from "src/utilities/commaSeparated";

function SavedSearchEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={4}>
        <img src={inbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No Recommendations
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        We will keep looking for recommendations for this search and will let
        you know when we have more results.
      </Text>
    </Box>
  );
}

function CompanyRecommendationsEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={6}>
        <img src={postbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No Recommendations
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        We dont have any company recommendations for you at this time. We will
        keep searching and let you know when we find some.
      </Text>
    </Box>
  );
}

export default function ExploreInbox() {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useCaseStudySearch({
    variables: { id },
  });

  if (loading) return <ViewLoading />;

  const search = data.caseStudySearch;
  const company = data.currentCompany;
  const articles = search.results.nodes;
  const skills = search.skills.map((s) => s.skill.name);

  const afterDelete = () => {
    history.replace("/explore");
  };

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          <Box flex={1}>
            <Text
              fontSize="5xl"
              fontWeight={600}
              letterSpacing="-0.04rem"
              mb={2}
            >
              {search.name}
            </Text>
            {search?.companyRecomendation ? (
              <Text size="lg" color="neutral800" lineHeight="24px">
                These are pre-made recommendations from a diverse range of
                projects that we think will be interesting to {company.name}{" "}
                based on your goals, industry and more.
              </Text>
            ) : (
              <Text size="lg" color="neutral800" lineHeight="24px">
                These are {commaSeparated(skills)} recommendations that we think
                will be a good fit for {company.name} based on your goals,
                industry, and more.
              </Text>
            )}
          </Box>
          {!search?.companyRecomendation && (
            <Box paddingLeft={8}>
              <Button
                as={Link}
                size="xs"
                variant="subtle"
                marginRight={1}
                to={`/explore/new/${search.id}/skills`}
              >
                <Pencil size={16} />
              </Button>
              <DeleteSearch search={search} onDelete={afterDelete} />
            </Box>
          )}
        </Box>
        <Box marginY={8} height="1px" bg="neutral200" />
      </Box>
      <CaseStudiesList articles={articles} search={search} />
      {articles.length === 0 &&
        (search.companyRecomendation ? (
          <CompanyRecommendationsEmpty />
        ) : (
          <SavedSearchEmpty />
        ))}
    </>
  );
}

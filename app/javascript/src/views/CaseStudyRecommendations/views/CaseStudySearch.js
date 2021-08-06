import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Box, Text, Heading } from "@advisable/donut";
import CaseStudiesList from "../components/CaseStudiesList";
import { useParams } from "react-router-dom";
import { useCaseStudySearch } from "../queries";
import inbox from "src/illustrations/inbox.svg";
import postbox from "src/illustrations/postbox.svg";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import ViewLoading from "../components/ViewLoading";
import DeleteSearch from "../components/DeleteSearch";
import commaSeparated from "src/utilities/commaSeparated";
import NotFound from "./NotFound";
import NotAuthorized from "./NotAuthorized";
import { isNotFound } from "../../NotFound";
import { isNotAuthorized } from "src/views/AccessDenied";
import useScrollToTop from "src/hooks/useScrollToTop";
import IconButton from "src/components/IconButton";

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

export default function CaseStudySearch() {
  useScrollToTop();
  const { id } = useParams();
  const history = useHistory();
  const { data, loading, error } = useCaseStudySearch({
    variables: { id },
  });

  if (loading) return <ViewLoading />;

  if (isNotFound(error)) {
    return <NotFound />;
  }

  if (isNotAuthorized(error)) {
    return <NotAuthorized />;
  }

  const search = data.caseStudySearch;
  const company = data.currentCompany;
  const articles = search.results.nodes;
  const skills = search.skills.map((s) => s.skill.name);

  const afterDelete = () => {
    history.replace("/explore");
  };

  if (!search.isFinalized) {
    return <Redirect to={`/explore/${id}/skills`} />;
  }

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          <Box flex={1}>
            <Heading size="5xl" mb={2}>
              {search.name}
            </Heading>
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
              <IconButton
                size="sm"
                as={Link}
                icon={Pencil}
                marginRight={1}
                aria-label="Edit search"
                to={`/explore/${search.id}/skills`}
              />
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

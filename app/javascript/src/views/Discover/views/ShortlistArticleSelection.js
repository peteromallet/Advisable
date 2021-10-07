import React, { useState } from "react";
import { Box, Text, Heading, Button } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { useCategoryArticles } from "../queries";
import { useHistory, useLocation, useParams } from "react-router";
import { ArrowSmRight, InformationCircle } from "@styled-icons/heroicons-solid";

export default function ShortlistArticleSelection() {
  const { slug } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState(location.state?.articles || []);
  const { data, fetchMore } = useCategoryArticles({
    variables: { slug },
  });
  const articles =
    data?.skillCategory?.articles?.edges?.map((edge) => edge.node) || [];

  const selectArticle = (article) => {
    if (selected.includes(article.id)) {
      setSelected(selected.filter((id) => id !== article.id));
    } else {
      setSelected([...selected, article.id]);
    }
  };

  const hasMore = data?.skillCategory?.articles?.pageInfo?.hasNextPage || false;

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        slug,
        after: data.skillCategory.articles.pageInfo.endCursor,
      },
    });
  };

  const handleContinue = () => {
    const selectedArticles = data.skillCategory.articles.edges.filter((e) => {
      return selected.includes(e.node.id);
    });

    const state = {
      name: selectedArticles[0].node.skills?.[0]?.skill?.name || "My shortlist",
      skillCategory: slug,
      articles: selected,
    };

    history.replace({ ...location, state });
    history.push("/explore/new/goals", state);
  };

  return (
    <>
      <BackButton to="/explore/new" marginBottom={4} />
      <Heading
        fontSize="6xl"
        letterSpacing="-0.04em"
        marginBottom={3}
        lineHeight="40px"
      >
        Which of the following case studies would you be interested in reading?
      </Heading>
      <Box maxWidth="600px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          We help your find freelancers by showcasing the projects they have
          done for others similar to you.
        </Text>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="28px">
        {articles.map((article) => (
          <Box
            key={article.id}
            padding={6}
            border="2px solid"
            borderRadius="24px"
            onClick={() => selectArticle(article)}
            css={`
              cursor: pointer;
            `}
            borderColor={
              selected.includes(article.id) ? "blue600" : "neutral100"
            }
          >
            <Text
              fontWeight={600}
              fontSize="2xl"
              marginBottom={3}
              letterSpacing="-0.03em"
              lineHeight="24px"
            >
              {article.title}
            </Text>
            <Text lineHeight="20px">{article.subtitle}</Text>
          </Box>
        ))}
      </Box>

      {hasMore && (
        <Box textAlign="center" maxWidth="320px" marginX="auto" paddingY={12}>
          <Text
            fontSize="lg"
            fontWeight={500}
            marginBottom={4}
            letterSpacing="-0.02em"
          >
            Not interested in any of these articles?
          </Text>
          <Button variant="dark" onClick={handleLoadMore}>
            Load more
          </Button>
        </Box>
      )}

      <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        bg="white"
        boxShadow="l"
        borderTop="1px solid"
        borderColor="neutral200"
      >
        <Box
          width="100%"
          marginX="auto"
          maxWidth="920px"
          height="100px"
          display="flex"
          paddingX={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {selected.length < 3 && (
              <Box
                display="flex"
                alignItems="center"
                textAlign="center"
                color="neutral800"
              >
                <InformationCircle size={24} />
                <Text marginLeft={2}>
                  Please select at least 3 case studies to continue
                </Text>
              </Box>
            )}
          </Box>
          <Button
            marginLeft={3}
            size="l"
            variant="gradient"
            suffix={<ArrowSmRight />}
            disabled={selected.length < 3}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
}

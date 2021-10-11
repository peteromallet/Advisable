import React, { useState } from "react";
import { Box, Text, Heading, Button } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { useCategoryArticles } from "../queries";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import { ArrowSmRight, InformationCircle } from "@styled-icons/heroicons-solid";
import ArticleSelection from "../components/ArticleSelection";
import Loading from "src/components/Loading";

export default function ShortlistArticleSelection() {
  const { slug } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState(location.state?.articles || []);
  const { data, loading, fetchMore } = useCategoryArticles({
    variables: { slug },
  });

  if (!location.state?.category) {
    return <Redirect to="/explore/new" />;
  }

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
    const state = {
      category: location.state.category,
      skillCategory: slug,
      articles: selected,
    };

    history.replace({ ...location, state });
    history.push("/explore/new/goals", state);
  };

  return (
    <>
      <BackButton to="/explore/new" marginBottom={4} />
      <Box maxWidth="800px" marginBottom={3}>
        <Heading fontSize="6xl" letterSpacing="-0.04em" lineHeight="40px">
          Which of the following projects seem similar to what you’re looking
          for?
        </Heading>
      </Box>
      <Box maxWidth="600px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          We help your find freelancers by showcasing the projects they have
          done for companies similar to yours.
        </Text>
      </Box>

      {loading && <Loading />}
      <Box
        display="grid"
        gridTemplateColumns={{ _: "1fr", m: "1fr 1fr" }}
        gridGap="28px"
      >
        {articles.map((article) => (
          <ArticleSelection
            key={article.id}
            article={article}
            onSelect={() => selectArticle(article)}
            isSelected={selected.includes(article.id)}
          />
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
            <Box
              display="flex"
              alignItems="center"
              color="neutral900"
              marginBottom={2}
            >
              <InformationCircle size={20} />
              <Text
                marginLeft={1}
                fontWeight={550}
                fontSize="17px"
                letterSpacing="-0.012em"
              >
                Please select at least 3 case studies to continue
              </Text>
            </Box>
            <Text color="neutral800">
              Don&apos;t worry, we&apos;ll save the projects you have selected
              for later.
            </Text>
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

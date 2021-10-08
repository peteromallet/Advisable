import React, { Suspense } from "react";
import css from "@styled-system/css";
import SuperEllipse from "react-superellipse";
import { Box, Circle, Text, theme } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import { PlusSm } from "@styled-icons/heroicons-solid";
import { useImage } from "react-image";
import { ErrorBoundary } from "react-error-boundary";
import LogoMark from "src/components/LogoMark";

function FaviconImage({ src }) {
  const { src: imgSrc } = useImage({ srcList: src });

  return <Box as="img" src={imgSrc} width="32px" borderRadius="8px" />;
}

export default function ArticleSelection({ article, onSelect, isSelected }) {
  return (
    <Box
      key={article.id}
      padding={6}
      border="1px solid"
      borderRadius="24px"
      onClick={onSelect}
      css={css({
        cursor: "pointer",
        outline: isSelected && `1px solid ${theme.colors.blue600}`,
        transition: "transform 200ms, box-shadow 200ms",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 8px 40px -8px rgba(0, 0, 0, 0.2)",
        },
      })}
      borderColor={isSelected ? "blue600" : "neutral200"}
    >
      <Box marginBottom={4} display="inline-flex" position="relative">
        <RecommendationAvatar src={article.specialist.avatar} size="3xs" />
        {article.company?.favicon && (
          <>
            <Box
              as={SuperEllipse}
              r1={0.02}
              r2={0.4}
              width="60px"
              height="72px"
              bg="neutral100"
              display="flex"
              marginLeft={2}
              alignItems="center"
              justifyContent="center"
            >
              <ErrorBoundary fallback={<LogoMark color="subtle" />}>
                <Suspense fallback={null}>
                  <FaviconImage src={article.company.favicon} />
                </Suspense>
              </ErrorBoundary>
            </Box>
            <Circle
              size="32px"
              bg="white"
              boxShadow="m"
              position="absolute"
              left="50%"
              top="50%"
              color="blue800"
              border="2px solid"
              borderColor="white"
              css={css({
                transform: "translate(-50%, -50%)",
              })}
            >
              <PlusSm size={20} />
            </Circle>
          </>
        )}
      </Box>
      <Text
        marginBottom={2}
        fontWeight={500}
        fontSize="14px"
        color="neutral600"
        textTransform="uppercase"
      >
        {article.specialist.name}
      </Text>
      <Text
        fontWeight={600}
        fontSize="24px"
        marginBottom={3}
        letterSpacing="-0.03em"
        lineHeight="28px"
      >
        {article.title}
      </Text>
      <Text fontWeight={420} marginBottom={5} lineHeight="24px">
        {article.comment}
      </Text>
      <Box marginBottom="-6px">
        {article.skills.map((s) => (
          <Box
            key={s.id}
            paddingY={1}
            paddingX={2}
            fontSize="14px"
            bg="neutral100"
            borderRadius="8px"
            marginRight={1.5}
            marginBottom={1.5}
            display="inline-flex"
            color="neutral800"
            fontWeight={450}
            letterSpacing="-0.02em"
          >
            {s.skill.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

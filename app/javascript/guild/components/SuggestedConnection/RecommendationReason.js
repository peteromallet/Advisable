import React from "react";

function commaList(list) {
  return list
    ?.map(({ name }) => name)
    ?.join(", ")
    ?.replace(/, ([^,]*)$/, " and $1");
}

function SkillRecommendation({ specialistRecommendation }) {
  const { skills, recommendation } = specialistRecommendation;
  return `${recommendation?.firstName} also works in ${commaList(skills)}`;
}

function IndustryRecommendation({ specialistRecommendation }) {
  const { industries, recommendation } = specialistRecommendation;
  return `${recommendation?.firstName} also works in ${commaList(industries)}`;
}

function RandomRecommendation({ specialistRecommendation }) {
  const { recommendation } = specialistRecommendation;
  return `We think you and ${recommendation?.firstName} could have some related skills or industries`;
}

const TYPES = {
  SkillRecommendation,
  IndustryRecommendation,
  RandomRecommendation,
};

export default function RecommendationReason({ specialistRecommendation }) {
  const Component = TYPES[specialistRecommendation?.__typename];
  if (!Component) return null;

  return <Component specialistRecommendation={specialistRecommendation} />;
}

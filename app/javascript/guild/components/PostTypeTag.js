import React from "react";
import { Tag } from "@advisable/donut";
import { ChartSquareBar } from "@styled-icons/heroicons-outline/ChartSquareBar";
import { Support } from "@styled-icons/heroicons-outline/Support";
import { UserGroup } from "@styled-icons/heroicons-outline/UserGroup";

const TYPES = {
  GuildPostAdviceRequired: {
    children: "Advice required",
    icon: Support,
  },
  GuildPostCaseStudy: {
    children: "Case study",
    icon: ChartSquareBar,
  },
  GuildPostOpportunity: {
    children: "Opportunity",
    icon: UserGroup,
  },
};

export default function PostTypeTag({ post, size, ...props }) {
  const postType = TYPES[post.__typename];
  if (!postType) return null;
  return <Tag size={size || "s"} {...TYPES[post.__typename]} {...props} />;
}

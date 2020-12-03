import React from "react";
import { Tag } from "@advisable/donut";
import {
  Support,
  UserGroup,
  ChartSquareBar,
} from "@styled-icons/heroicons-outline";

const TYPES = {
  GuildPostAdviceRequired: {
    children: "Advice required",
    icon: Support,
    variant: "orange",
  },
  GuildPostCaseStudy: {
    children: "Case study",
    icon: ChartSquareBar,
    variant: "cyan",
  },
  GuildPostOpportunity: {
    children: "Opportunity",
    icon: UserGroup,
    variant: "blue",
  },
};

export default function PostTypeTag({ post }) {
  const postType = TYPES[post.__typename];
  if (!postType) return null;
  return <Tag size="m" {...TYPES[post.__typename]} />;
}

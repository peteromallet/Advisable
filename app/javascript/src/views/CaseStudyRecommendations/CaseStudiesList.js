import React from "react";
import { Stack } from "@advisable/donut";
import CaseStudyCard from "./RecommendationCard";

const DATA = [
  {
    id: 1,
    title:
      "How Hassan Zia Helped Cloud Tutorial Boost Reach Potential Customers with Relevant Long-Form Content",
    subtitle:
      "In this case study, you'll learn how I helped a SaaS startup boost engagement on their website and establish best practices for content creation by producing a catalogue of high quality blog posts.",
    favicon: "http://localhost:3000/favicon-32.png",
    specialist: {
      id: 1,
      name: "Thomas Cullen",
      avatar: "https://source.unsplash.com/600x800/?face",
    },
  },
  {
    id: 2,
    title:
      "How Hassan Zia Helped Cloud Tutorial Boost Reach Potential Customers with Relevant Long-Form Content",
    subtitle:
      "In this case study, you'll learn how I helped a SaaS startup boost engagement on their website and establish best practices for content creation by producing a catalogue of high quality blog posts.",
    favicon: "http://localhost:3000/favicon-32.png",
    specialist: {
      id: 1,
      name: "Thomas Cullen",
      avatar: "https://source.unsplash.com/600x800/?smile",
    },
  },
  {
    id: 3,
    title:
      "How Hassan Zia Helped Cloud Tutorial Boost Reach Potential Customers with Relevant Long-Form Content",
    subtitle:
      "In this case study, you'll learn how I helped a SaaS startup boost engagement on their website and establish best practices for content creation by producing a catalogue of high quality blog posts.",
    favicon: "http://localhost:3000/favicon-32.png",
    specialist: {
      id: 1,
      name: "Thomas Cullen",
      avatar: "https://source.unsplash.com/600x800/?portrait",
    },
  },
  {
    id: 4,
    title:
      "How Hassan Zia Helped Cloud Tutorial Boost Reach Potential Customers with Relevant Long-Form Content",
    subtitle:
      "In this case study, you'll learn how I helped a SaaS startup boost engagement on their website and establish best practices for content creation by producing a catalogue of high quality blog posts.",
    favicon: "http://localhost:3000/favicon-32.png",
    specialist: {
      id: 1,
      name: "Thomas Cullen",
      avatar: "https://source.unsplash.com/600x800/?person",
    },
  },
];

export default function CaseStudiesList() {
  return (
    <Stack spacing="4xl" divider="neutral200">
      {DATA.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </Stack>
  );
}

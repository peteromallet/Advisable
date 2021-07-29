import React from "react";
import styled from "styled-components";
import Images from "./Images";
import Heading from "./Heading";
import Results from "./Results";
import Paragraph from "./Paragraph";

const CONTENT_TYPES = {
  Images,
  Heading,
  Results,
  Paragraph,
};

const StyledSectionTitle = styled.h4`
  font-weight: 500;
  font-size: 13px;
  color: #9f9da6;
  margin-top: 60px;
  letter-spacing: 0.02rem;
  text-transform: uppercase;
`;

function CaseStudyContentBlock({ content }) {
  const Component = CONTENT_TYPES[content.__typename];
  if (!Component) return null;
  return <Component {...content} />;
}

export default function CaseStudyContent({ caseStudy }) {
  return (
    <>
      {caseStudy.sections.map((section) => (
        <div key={section.id}>
          <StyledSectionTitle>{section.type}</StyledSectionTitle>
          {section.contents.map((content) => (
            <CaseStudyContentBlock key={content.id} content={content} />
          ))}
        </div>
      ))}
    </>
  );
}

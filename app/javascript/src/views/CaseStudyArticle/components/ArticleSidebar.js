import React, { useEffect } from "react";
import { useViewportScroll } from "framer-motion";

const SectionType = ({ children }) => (
  <div className="p-2 text-sm font-[650] uppercase">{children}</div>
);

const SectionTypeHover = ({ children }) => (
  <div className="bg-white group-hover:drop-shadow-lg transition-shadow rounded-xs hidden absolute top-0 left-0 right-0 group-hover:block z-10 pointer-events-none overflow-visible">
    {children}
  </div>
);

const Header = ({ children }) => <div className="p-2">{children}</div>;

const SectionMenuItem = ({ section }) => (
  <div className="group cursor-pointer relative overflow-visible">
    <SectionType>{section.type}</SectionType>
    <SectionTypeHover section={section}>
      <SectionType>{section.type}</SectionType>
      <Header>{section.header.text}</Header>
    </SectionTypeHover>
  </div>
);

const Subheader = ({ subheader }) => (
  <h6 className="p-2 pl-6 cursor-pointer hover:bg-white rounded-xs hover:shadow-lg hover:z-20">
    {subheader.text}
  </h6>
);

export default function ArticleSidebar({ caseStudy }) {
  const { scrollYProgress } = useViewportScroll();

  const sections = caseStudy.sections.map((section) => ({
    id: section.id,
    type: section.type,
    header: section.contents.find((content) => content.size == "h1"),
    subheaders: section.contents.filter((content) => content.size == "h2"),
  }));

  useEffect(() => {
    console.log("scroll", scrollYProgress);
  }, [scrollYProgress]);

  return (
    <div>
      <div className="min-w-[320px] sticky top-28">
        <div
          style={{ width: `${scrollYProgress}%` }}
          className="h-2 bg-red-700"
        />
        {sections.map((section) => (
          <div key={section.id}>
            <a href={`#${section.id}`}>
              <SectionMenuItem section={section} />
            </a>
            {section.subheaders.map((subheader) => (
              <a key={subheader.id} href={`#${subheader.id}`}>
                <Subheader subheader={subheader} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

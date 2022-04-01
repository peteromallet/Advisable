import React from "react";

export default function ArticleSidebar({ caseStudy }) {
  const sections = caseStudy.sections.map((section) => {
    return {
      id: section.id,
      type: section.type,
      header: section.contents.find((content) => content.size == "h1"),
      subheaders: section.contents.filter((content) => content.size == "h2"),
    };
  });

  console.log("sections", sections);

  return (
    <div>
      <div className="min-w-[320px] sticky top-28">
        {sections.map((section) => (
          <div key={section.id}>
            <a href={`#${section.id}`}>
              <div className="group cursor-pointer relative overflow-visible">
                <div className="p-2 uppercase">{section.type}</div>
                <div className="bg-white group-hover:drop-shadow-lg transition-shadow rounded-xs hidden absolute top-0 left-0 right-0 group-hover:block z-10 pointer-events-none overflow-visible">
                  <div className="p-2 uppercase">{section.type}</div>
                  <div className="p-2">{section.header.text}</div>
                </div>
              </div>
            </a>
            <div>
              {section.subheaders.map((subheader) => (
                <a key={subheader.id} href={`#${subheader.id}`}>
                  <h6 className="p-2 pl-6 cursor-pointer hover:bg-white rounded-xs hover:shadow-lg hover:z-20">
                    {subheader.text}
                  </h6>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

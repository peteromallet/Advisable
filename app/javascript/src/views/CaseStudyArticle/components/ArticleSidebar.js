import React from "react";

const SectionType = ({ children }) => (
  <div className="pl-2 py-2 leading-5 text-sm text-neutral700 font-[650] uppercase">
    {children}
  </div>
);

const SectionTypeHover = ({ children }) => (
  <div className="bg-white group-hover:drop-shadow-lg transition-shadow rounded-xs hidden absolute top-0 left-2 right-0 pb-2 group-hover:block z-10 pointer-events-none overflow-visible">
    {children}
  </div>
);

const Header = ({ children }) => (
  <div className="pl-2 text-[15px] text-neutral700">{children}</div>
);

const Heading = ({ item }) => (
  <a href={`#${item.id}`}>
    <div className="group relative overflow-visible pl-2">
      <SectionType>{item.section.type}</SectionType>
      <SectionTypeHover>
        <SectionType>{item.section.type}</SectionType>
        <Header>{item.text}</Header>
      </SectionTypeHover>
    </div>
  </a>
);

const Subheading = ({ item }) => {
  return (
    <div className="ml-2">
      <a href={`#${item.id}`}>
        <div className="group relative overflow-visible py-2 pl-6 pr-2">
          <h6 className="line-clamp-1 leading-5 text-neutral600 text-[15px] font-[450]">
            {item.text}
          </h6>
          <div className="bg-white group-hover:drop-shadow-lg transition-shadow rounded-xs hidden absolute top-0 left-0 right-0 py-2 pl-6 pr-2 group-hover:block z-10 pointer-events-none overflow-visible">
            <h6 className="leading-5 text-neutral600 text-[15px] font-[450]">
              {item.text}
            </h6>
          </div>
        </div>
      </a>
    </div>
  );
};

export default function ArticleSidebar({ elements, scrollState }) {
  const menuItems = elements
    .map((el, index) => ({ ...el, index }))
    .filter(({ __typename }) => __typename === "Heading");

  const numOfItems = menuItems.length;
  let active;
  let activeMenu = 0;
  for (let i = elements.length - 1; i > -1; i--) {
    if (scrollState[i] && !active) {
      active = i;
    }
    if (menuItems[i]?.index <= active) {
      activeMenu = i;
    }
    if (active && activeMenu) break;
  }

  return (
    <div>
      <div className="min-w-[320px] sticky top-[164px] pt-px pb-[3px]">
        <div className="absolute top-1 bottom-2 w-0.5 bg-gray-200">
          <div
            style={{ height: `${(100 / numOfItems) * (activeMenu + 1)}%` }}
            className={`absolute top-0 left-0 right-0 bg-blue-600 transition-height`}
          />
        </div>
        {menuItems.map((item) =>
          item.size === "h1" ? (
            <Heading item={item} key={item.id} />
          ) : (
            <Subheading item={item} key={item.id} />
          ),
        )}
      </div>
    </div>
  );
}

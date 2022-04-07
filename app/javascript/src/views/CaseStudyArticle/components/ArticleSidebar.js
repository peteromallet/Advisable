import React from "react";

const SectionType = ({ children }) => (
  <div className="p-2 text-sm font-[650] uppercase">{children}</div>
);

const SectionTypeHover = ({ children }) => (
  <div className="bg-white group-hover:drop-shadow-lg transition-shadow rounded-xs hidden absolute top-0 left-0 right-0 group-hover:block z-10 pointer-events-none overflow-visible">
    {children}
  </div>
);

const Header = ({ children }) => <div className="p-2">{children}</div>;

const Heading = ({ item }) => (
  <a href={`#${item.id}`}>
    <div className="group cursor-pointer relative overflow-visible">
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
    <a key={item.id} href={`#${item.id}`}>
      <h6 className="p-2 pl-6 cursor-pointer hover:bg-white rounded-xs hover:shadow-lg hover:z-20">
        {item.text}
      </h6>
    </a>
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
      <div className="min-w-[320px] sticky top-[164px]">
        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200">
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

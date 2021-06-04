import sumBy from "lodash/sumBy";

const setSectionsRatio = (state) => {
  const sectionKeys = Object.keys(state.sections);
  const ratioExist = sectionKeys.every((key) => state.sections[key].ratio);
  if (ratioExist) return { ...state };
  const sectionsArea = sumBy(sectionKeys, (key) => state.sections[key].area);
  const percent = sectionsArea / 100;
  const sections = sectionKeys.reduce((acc, key) => {
    // Calc and set ratio to each section
    const ratio = acc[key].area / percent || 0.5;
    return { ...acc, [key]: { ...acc[key], ratio } };
  }, state.sections);
  return { ...state, sections };
};

export default setSectionsRatio;

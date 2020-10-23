import setSizeParams from "../setSizeParams";

const initSectionsWidth = (state) => {
  const { sectionKeys, sections, wrapperWidth } = state;
  const sectionsWidth = sectionKeys.reduceRight(
    (acc, sectionKey, index) => {
      let sectionWidth, sum;
      if (index > 0) {
        sectionWidth = setSizeParams(1, sections[sectionKey].maxWidth).width;
      } else {
        sectionWidth = acc.wrapperWidth - acc.sum;
      }
      sum = acc.sum + sectionWidth;
      if (index === 0) return [sectionWidth, ...acc.widths];
      return { ...acc, sum, widths: [sectionWidth, ...acc.widths] };
    },
    {
      wrapperWidth: wrapperWidth,
      widths: [],
      sum: 0,
    },
  );
  return { ...state, sectionsWidth };
};

export default initSectionsWidth;

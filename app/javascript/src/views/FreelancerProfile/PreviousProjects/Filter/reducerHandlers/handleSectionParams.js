import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import sumBy from "lodash/sumBy";

export const handleSectionParams = (state, sectionName, params) => {
  const maxWidth = maxBy(params, "width");
  const minWidth = minBy(params, "width");
  const maxHeight = maxBy(params, "height");
  const minHeight = minBy(params, "height");
  const sumWidth = sumBy(params, "width");
  const sumHeight = sumBy(params, "height");
  const area = sumHeight * sumWidth;
  return {
    ...state,
    sections: {
      ...state.sections,
      [sectionName]: {
        maxWidth,
        minWidth,
        maxHeight,
        minHeight,
        sumWidth,
        sumHeight,
        area,
        list: params,
      },
    },
  };
};

export default handleSectionParams;

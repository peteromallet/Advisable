import Fuse from "fuse.js";

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["label"],
};

const filterItems = (downshift, options) => {
  const { inputValue } = downshift;
  let items = options;

  if (Boolean(inputValue)) {
    var fuse = new Fuse(options, fuseOptions);
    items = fuse.search(inputValue);
  }

  return items;
};

export default filterItems;

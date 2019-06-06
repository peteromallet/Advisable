import { get } from "lodash";
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
  const { inputValue, selectedItem } = downshift;
  let items = options;

  if (inputValue && inputValue !== get(selectedItem, "label", undefined)) {
    var fuse = new Fuse(options, fuseOptions); // "list" is the item array
    items = fuse.search(inputValue);
  }

  return items;
};

export default filterItems;

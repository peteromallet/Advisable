import { find } from "lodash-es";

export const getSelected = (value, options) => {
  return find(options, { value: value }) || null;
};

export const getSelectedMultiple = (value, options) => {
  return value.map((item) => find(options, { value: item }));
};

export const handleRemoveItem = (item, value, onChange) => () => {
  const next = value.filter((i) => i !== item.value);
  onChange(next);
};

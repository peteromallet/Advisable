export const getSelected = (value, options) => {
  return options.find((o) => o.value === value) || null;
};

export const getSelectedMultiple = (value, options) => {
  return value.map((item) => options.find((o) => o.value === item));
};

export const handleRemoveItem = (item, value, onChange) => () => {
  const next = value.filter((i) => i !== item.value);
  onChange(next);
};

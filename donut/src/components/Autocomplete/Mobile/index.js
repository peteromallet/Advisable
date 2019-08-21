import React from "react";
import { get } from "lodash";
import Menu from "./Menu";
import Text from "../../Text";
import FieldError from "../../FieldError";
import {
  Autocomplete as AutocompleteStyles,
  Input,
  Label,
  Tags,
} from "../styles";
import Tag from "../Tag";
import { getSelected, getSelectedMultiple, handleRemoveItem } from "../utils";

const AutocompleteMobile = props => {
  const {
    options,
    placeholder,
    onChange,
    label,
    error,
    description,
    initalSelectedItem,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleChange = value => {
    if (!props.multiple) {
      setOpen(false);
    }
    if (onChange) onChange(value);
  };

  const selected = props.multiple
    ? getSelectedMultiple(props.value, options)
    : getSelected(props.value, options);

  const handleFocus = e => {
    setOpen(true);
  };

  return (
    <AutocompleteStyles>
      <Label as="label" size="xs" weight="medium" color="neutral.N7">
        {label}
      </Label>
      {description && (
        <Text mb="xs" mt="-4px" size="xs" lineHeight="xs" color="neutral.5">
          {description}
        </Text>
      )}
      {props.multiple && (
        <Tags>
          {selected.map(item => (
            <Tag
              key={item.value}
              onRemove={handleRemoveItem(item, props.value, onChange)}
            >
              {item.label}
            </Tag>
          ))}
        </Tags>
      )}
      <Input
        value={get(initalSelectedItem, "label", "")}
        onFocus={handleFocus}
        placeholder={placeholder}
        readOnly
      />
      {error && <FieldError>{error}</FieldError>}
      {open && (
        <Menu
          max={props.max}
          isMax={props.isMax}
          value={props.value}
          multiple={props.multiple}
          onClose={() => setOpen(false)}
          onChange={handleChange}
          placeholder={placeholder}
          options={options}
          initalSelectedItem
          onChange={handleChange}
        />
      )}
    </AutocompleteStyles>
  );
};

export default AutocompleteMobile;

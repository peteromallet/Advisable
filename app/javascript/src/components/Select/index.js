import React from "react";
import uniqueID from "lodash/uniqueId";
import { Select, Wrapper, SelectWrapper, Arrows } from "./styles.js";
import InputLabel from "src/components/InputLabel";

class SelectComponent extends React.Component {
  componentWillMount() {
    this.id = this.props.id || uniqueID("Select");
  }

  componentDidMount() {
    // If there is no placeholder or vlaue we manually fire a change event
    // so that the first option is set
    if (!this.props.placeholder && !this.props.value) {
      const event = new Event('change', { bubbles: true  });
      this.select.dispatchEvent(event)
    }
  }

  render() {
    const {
      name,
      options,
      block,
      label,
      value,
      placeholder,
      onChange,
      onFocus,
      onBlur
    } = this.props;

    // Placeholder value is an empty string
    const PLACEHOLDER_VALUE = "";

    const isPlaceholder = Boolean(!value && placeholder);
    const placeholderMarkup = isPlaceholder && (
      <option value={PLACEHOLDER_VALUE} disabled>
        {placeholder}
      </option>
    );

    const optionsMarkup = options.map(option => {
      if (typeof option === "string") {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      } else {
        return (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        );
      }
    });

    // When there is no onChange, React will complain about providing a `value`
    // (and vice versa for `defaultValue`)
    const defaultValue = onChange ? undefined : value || PLACEHOLDER_VALUE;
    const finalValue = onChange ? value || PLACEHOLDER_VALUE : undefined;

    return (
      <Wrapper block={block}>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
        <SelectWrapper block={block}>
          <Select
            name={name}
            value={finalValue}
            innerRef={c => this.select = c}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {placeholderMarkup}
            {optionsMarkup}
          </Select>
          <Arrows />
        </SelectWrapper>
      </Wrapper>
    );
  }
}

export default SelectComponent;

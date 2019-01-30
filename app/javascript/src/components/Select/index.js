import React from "react";
import uniqueID from "lodash/uniqueId";
import { Select, Wrapper, SelectWrapper, Arrows } from "./styles.js";
import InputLabel from "src/components/InputLabel";
import InputError from "src/components/InputError";
import InputDescription from "src/components/InputDescription";
import { extractSpacingProps } from 'src/components/Spacing';

class SelectComponent extends React.Component {
  componentWillMount() {
    this.id = this.props.id || uniqueID("Select");
  }

  componentDidMount() {
    this.setFirstOption()
  }

  componentDidUpdate({ options }) {
    if (options.length !== this.props.options.length) {
      this.setFirstOption()
    }
  }

  setFirstOption() {
    // If there is no placeholder or value we manually fire a change event
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
      onBlur,
      error,
      description
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
      <Wrapper block={block} {...extractSpacingProps(this.props)}>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
        <SelectWrapper block={block}>
          <Select
            name={name}
            value={finalValue}
            ref={c => this.select = c}
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
        {error && <InputError>{error}</InputError>}
        {description && <InputDescription>{description}</InputDescription>}
      </Wrapper>
    );
  }
}

export default SelectComponent;

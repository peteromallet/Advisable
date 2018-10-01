import React from "react";
import uniqueID from "lodash/uniqueId";
import { Wrapper, Input, Textarea } from "./styles";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";

class TextField extends React.Component {
  componentWillMount() {
    this.id = this.props.id || uniqueID("TextField");
  }

  render() {
    const {
      type = "text",
      id,
      name,
      value,
      multiline= false,
      block = false,
      onChange,
      onBlur,
      label,
      error,
      placeholder,
      mask
    } = this.props;

    const Component = multiline ? Textarea : Input;

    return (
      <Wrapper block={block}>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
        <Component
          type={type}
          mask={mask}
          id={this.id}
          name={name}
          value={value}
          onBlur={onBlur}
          autoComplete="off"
          onChange={onChange}
          placeholder={placeholder}
          innerRef={c => this.input = c}
        />
        {error && <InputError>{error}</InputError>}
      </Wrapper>
    )
  }
}

export default TextField

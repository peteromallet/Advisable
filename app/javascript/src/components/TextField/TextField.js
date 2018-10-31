import React from "react";
import uniqueID from "lodash/uniqueId";
import { Wrapper, Input, InputMask, Textarea } from "./styles";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import { extractSpacingProps } from "src/components/Spacing";

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
      multiline = false,
      block = false,
      onChange,
      onBlur,
      onFocus,
      label,
      error,
      placeholder,
      mask,
      readOnly,
      disabled,
      style,
      autoFocus,
      ...props
    } = this.props;

    let Component = Input;

    if (multiline) {
      Component = Textarea;
    }

    if (mask) {
      Component = InputMask;
    }

    return (
      <Wrapper block={block} {...extractSpacingProps(props)}>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
        <Component
          autoFocus={autoFocus}
          type={type}
          mask={mask}
          id={this.id}
          name={name}
          style={style}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
          onChange={onChange}
          placeholder={placeholder}
          innerRef={c => (this.input = c)}
          readOnly={readOnly}
          disabled={disabled}
        />
        {error && <InputError>{error}</InputError>}
      </Wrapper>
    );
  }
}

export default TextField;

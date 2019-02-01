import React, { useRef, useState } from "react";
import uniqueID from "lodash/uniqueId";
import {
  Wrapper,
  InputContainer,
  Input,
  InputMask,
  Textarea,
  CharCount
} from "./styles";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import InputDescription from "src/components/InputDescription";
import { extractSpacingProps } from "src/components/Spacing";

const TextField = ({
  type,
  name,
  value = "",
  multiline,
  block,
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
  maxLength,
  autoFocus,
  description,
  ...props
}) => {
  const input = useRef(null);
  const [rows, setRows] = useState(props.minRows);
  const [id, _] = useState(props.id || uniqueID("TextField"));

  const charCount = maxLength && (maxLength || 0) - value.length;

  let Component = Input;

  if (multiline) {
    Component = Textarea;
  }

  if (mask) {
    Component = InputMask;
  }

  const lineHeight = 18;
  const handleChange = e => {
    if (multiline && props.autoHeight) {
      const previousRows = e.target.rows;
      e.target.rows = props.minRows;
      const currentRows = Math.floor((e.target.scrollHeight - 20) / lineHeight);
      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }
      setRows(currentRows);
    }

    onChange(e);
  };

  return (
    <Wrapper block={block} {...extractSpacingProps(props)}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputContainer>
        <Component
          autoFocus={autoFocus}
          type={type}
          mask={mask}
          id={id}
          name={name}
          style={style}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
          onChange={handleChange}
          placeholder={placeholder}
          ref={input}
          readOnly={readOnly}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
        />
        {maxLength && <CharCount>{charCount}</CharCount>}
      </InputContainer>
      {error && <InputError>{error}</InputError>}
      {description && <InputDescription>{description}</InputDescription>}
    </Wrapper>
  );
};

TextField.defaultProps = {
  type: "text",
  minRows: 3,
  block: false,
  multiline: false,
  autoHeight: false
};

export default TextField;

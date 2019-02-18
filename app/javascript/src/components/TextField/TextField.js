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
  charCount,
  maxLength,
  autoFocus,
  description,
  ...props
}) => {
  const input = useRef(null);
  const [rows, setRows] = useState(props.minRows);
  const [id, _] = useState(props.id || uniqueID("TextField"));

  let charLimit = charCount || maxLength;
  let characterCount = (charLimit - (value || '').length);
  if (characterCount < 0) {
    characterCount = 0
  }

  let Component = Input;

  if (multiline) {
    Component = Textarea;
  }

  if (mask) {
    Component = InputMask;
  }

  const LINE_HEIGHT = 18;
  const calculateRows = () => {
    if (!multiline || !props.autoHeight) return;
    const el = input.current;
    const previousRows = el.rows;
    el.rows = props.minRows;
    let baseHeight = el.scrollHeight - 20;
    if (maxLength || charCount) {
      baseHeight += 30;
    }
    let currentRows = Math.floor(baseHeight / LINE_HEIGHT);

    if (currentRows === previousRows) {
      el.rows = currentRows;
    }

    setRows(currentRows);
  };

  React.useLayoutEffect(calculateRows, [input]);

  const handleChange = e => {
    calculateRows();
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
        {(charCount || maxLength) && <CharCount>{characterCount}</CharCount>}
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

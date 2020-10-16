import { Textarea } from "@advisable/donut";
import { StyledBulletPointInput, StyledBulletPointInputItem } from "./styles";

export default function BulletPointInput({
  value,
  placeholder,
  onChange,
  ...rest
}) {
  const list = [...value, ""];

  const handleKeyDown = (i) => (e) => {
    const inputValue = e.target.value;
    const previousInput = e.target.parentNode?.parentNode?.previousSibling;
    const nextInput = e.target.parentNode?.parentNode?.nextSibling;

    if (e.keyCode === 13) {
      e.preventDefault();
      nextInput?.querySelector("textarea").focus();
    }

    // backspace
    if (e.keyCode === 8 && inputValue.length === 0) {
      if (!nextInput) {
        previousInput.querySelector("textarea").focus();
      }

      onChange(value.filter((item, index) => index !== i));
    }
  };

  const handleChange = (i) => (e) => {
    const inputValue = e.target.value;
    const nextValue = value || [];

    if (nextValue[i] === null || nextValue[i] === undefined) {
      onChange([...nextValue, inputValue]);
    } else {
      onChange(
        nextValue.map((item, index) => {
          if (index !== i) return item;
          return inputValue;
        }),
      );
    }
  };

  return (
    <StyledBulletPointInput {...rest}>
      {list.map((item, i) => (
        <StyledBulletPointInputItem key={`bullet-post-input-${i}`}>
          <Textarea
            minRows={1}
            value={item}
            rowPadding={2}
            name={`${rest.name}[${i}]`}
            style={{ width: "100%" }}
            placeholder={item ? null : placeholder}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
          />
        </StyledBulletPointInputItem>
      ))}
    </StyledBulletPointInput>
  );
}

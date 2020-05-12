import React from "react";
import { nanoid } from "nanoid";
import { Star } from "@styled-icons/feather";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import pluralize from "../../utilities/pluralize";
import { StyledStarRatingInput, StyledStarRating } from "./styles";

const StarRatingInput = React.memo(function StarRatingInput({
  name,
  value,
  onChange,
}) {
  const [hover, setHover] = React.useState(false);
  const [current, setCurrent] = React.useState(value);

  let displayValue = hover ? current : value;
  displayValue = displayValue ? Number(displayValue) : 0;

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleChange = (e) => {
    onChange(Number(e.currentTarget.value));
  };

  return (
    <StyledStarRatingInput
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StarRadio
        value="1"
        name={name}
        onChange={handleChange}
        checked={value === 1}
        filled={displayValue >= 1}
        onMouseEnter={() => setCurrent("1")}
      />
      <StarRadio
        value="2"
        name={name}
        onChange={handleChange}
        checked={value === 2}
        filled={displayValue >= 2}
        onMouseEnter={() => setCurrent("2")}
      />
      <StarRadio
        value="3"
        name={name}
        onChange={handleChange}
        checked={value === 3}
        filled={displayValue >= 3}
        onMouseEnter={() => setCurrent("3")}
      />
      <StarRadio
        value="4"
        name={name}
        onChange={handleChange}
        checked={value === 4}
        filled={displayValue >= 4}
        onMouseEnter={() => setCurrent("4")}
      />
      <StarRadio
        value="5"
        name={name}
        onChange={handleChange}
        checked={value === 5}
        filled={displayValue === 5}
        onMouseEnter={() => setCurrent("5")}
      />
    </StyledStarRatingInput>
  );
});

function StarRadio({
  id,
  name,
  value,
  filled,
  checked,
  onChange,
  onMouseEnter,
}) {
  const inputID = React.useMemo(() => id || nanoid(8), [id]);

  return (
    <StyledStarRating filled={filled} onMouseEnter={onMouseEnter}>
      <VisuallyHidden>
        <input
          type="radio"
          name={name}
          id={inputID}
          value={value}
          onChange={onChange}
          checked={checked}
        />
      </VisuallyHidden>
      <label htmlFor={inputID}>
        <VisuallyHidden>
          {pluralize(Number(value), "star", "stars")}
        </VisuallyHidden>
        <Star size={24} strokeWidth={0} fill="currentColor" />
      </label>
    </StyledStarRating>
  );
}

export default StarRatingInput;

import React from "react";
import { nanoid } from "nanoid";
import { useBreakpoint } from "@advisable/donut";
import { Star } from "@styled-icons/feather";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import pluralize from "../../utilities/pluralize";
import { StyledStarRatingInput, StyledStarRating } from "./styles";

const StarRatingInput = React.memo(function StarRatingInput({
  name,
  value,
  onChange,
  label,
}) {
  const mUp = useBreakpoint("mUp");
  const [hover, setHover] = React.useState(false);
  const [current, setCurrent] = React.useState(value);

  let displayValue = hover ? current : value;
  displayValue = displayValue ? Number(displayValue) : 0;

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleChange = (e) => {
    onChange(Number(e.currentTarget.value));
  };

  const handleStarHover = (num) => () => setCurrent(num);

  return (
    <StyledStarRatingInput
      onMouseEnter={mUp ? handleMouseEnter : null}
      onMouseLeave={mUp ? handleMouseLeave : null}
    >
      <StarRadio
        value="1"
        name={name}
        onChange={handleChange}
        checked={value === 1}
        label={label}
        filled={displayValue >= 1}
        onMouseEnter={mUp ? handleStarHover("1") : null}
      />
      <StarRadio
        value="2"
        name={name}
        onChange={handleChange}
        checked={value === 2}
        label={label}
        filled={displayValue >= 2}
        onMouseEnter={mUp ? handleStarHover("2") : null}
      />
      <StarRadio
        value="3"
        name={name}
        onChange={handleChange}
        checked={value === 3}
        label={label}
        filled={displayValue >= 3}
        onMouseEnter={mUp ? handleStarHover("3") : null}
      />
      <StarRadio
        value="4"
        name={name}
        onChange={handleChange}
        checked={value === 4}
        label={label}
        filled={displayValue >= 4}
        onMouseEnter={mUp ? handleStarHover("4") : null}
      />
      <StarRadio
        value="5"
        name={name}
        onChange={handleChange}
        checked={value === 5}
        label={label}
        filled={displayValue === 5}
        onMouseEnter={mUp ? handleStarHover("5") : null}
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
  label,
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
          {`Rate ${label} ${pluralize(Number(value), "star", "stars")}`}
        </VisuallyHidden>
        <Star size={24} strokeWidth={0} fill="currentColor" />
      </label>
    </StyledStarRating>
  );
}

export default StarRatingInput;

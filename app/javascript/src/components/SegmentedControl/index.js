import { extractSpacingProps } from "@advisable/donut";
import SegmentedControlRadio from "./SegmentedControlRadio";
import { SegmentedControl as SegmentedControlStyles } from "./styles";

const SegmentedControl = ({ options, value, ...rest }) => {
  const spacingProps = extractSpacingProps(rest);

  return (
    <SegmentedControlStyles {...spacingProps}>
      {options.map(option => (
        <SegmentedControlRadio
          key={option.value}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          {...rest}
        />
      ))}
    </SegmentedControlStyles>
  );
};

export default SegmentedControl;

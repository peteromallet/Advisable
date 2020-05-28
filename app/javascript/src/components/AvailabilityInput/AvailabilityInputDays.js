import React from "react";
import AvailabilityInputTimes from "./AvailabilityInputTimes";
import EmptyColumn from "./EmptyColumn";
import { StyledAvailabilityInputColumns } from "./styles";

function AvailabilityInputDays({ children, maxHeight }) {
  const scrollView = React.useRef(null);

  React.useLayoutEffect(() => {
    // if (scrollView.current) {
    //   scrollView.current.scrollTo(0, 700);
    // }
  }, []);

  return (
    <StyledAvailabilityInputColumns maxHeight={maxHeight} ref={scrollView}>
      <AvailabilityInputTimes />
      {children}
      <EmptyColumn />
    </StyledAvailabilityInputColumns>
  );
}

export default AvailabilityInputDays;

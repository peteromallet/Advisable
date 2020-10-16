import { useRef, useLayoutEffect } from "react";
import AvailabilityInputTimes from "./AvailabilityInputTimes";
import EmptyColumn from "./EmptyColumn";
import { StyledAvailabilityInputColumns } from "./styles";

function AvailabilityInputDays({ children, maxHeight }) {
  const scrollView = useRef(null);

  useLayoutEffect(() => {
    scrollView.current.scrollTop = 700;
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

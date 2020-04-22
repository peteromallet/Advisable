import React from "react";
import { ChevronLeft, ChevronRight } from "@styled-icons/feather";
import { Header, HeaderCell, NavButton } from "./styles";
import { useBreakpoint } from "@advisable/donut";

const AvailabilityCalendarHeader = ({
  dates,
  onPrevious,
  previousDisabled,
  onNext,
}) => {
  const isMobile = useBreakpoint("m");

  return (
    <Header>
      <NavButton
        type="button"
        previous
        onClick={onPrevious}
        disabled={previousDisabled}
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </NavButton>
      <NavButton type="button" onClick={onNext} next>
        <ChevronRight size={20} strokeWidth={2} />
      </NavButton>
      {dates.map((date, i) => {
        return (
          <HeaderCell
            key={i}
            isSaturday={date.day() === 6}
            isSunday={date.day() === 0}
          >
            <h4>{date.format(isMobile ? "dd" : "ddd")}</h4>
            <span>{date.format("DD MMM")}</span>
          </HeaderCell>
        );
      })}
    </Header>
  );
};

export default AvailabilityCalendarHeader;

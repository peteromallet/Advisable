import React, { Component } from "react";
import Icon from "src/components/Icon";
import { Mobile } from "src/components/Breakpoint";
import { Header, HeaderCell, NavButton } from "./styles";

const AvailabilityCalendarHeader = ({
  dates,
  onPrevious,
  previousDisabled,
  onNext
}) => {
  return (
    <Mobile>
      {isMobile => (
        <Header>
          <NavButton
            type="button"
            previous
            onClick={onPrevious}
            disabled={previousDisabled}
          >
            <Icon icon="chevron-left" />
          </NavButton>
          <NavButton type="button" onClick={onNext} next>
            <Icon icon="chevron-right" />
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
      )}
    </Mobile>
  );
};

export default AvailabilityCalendarHeader;

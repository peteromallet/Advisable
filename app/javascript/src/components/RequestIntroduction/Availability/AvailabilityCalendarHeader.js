import React, { Component } from "react";
import { Header, HeaderCell } from "./styles";

const AvailabilityCalendarHeader = ({ dates }) => {
  return (
    <Header>
      {dates.map((date, i) => {
        return (
          <HeaderCell key={i} isSaturday={date.day() === 6} isSunday={date.day() === 0}>
            <h4>{date.format("ddd")}</h4>
            <span>{date.format("DD")}</span>
          </HeaderCell>
        );
      })}
    </Header>
  );
};

export default AvailabilityCalendarHeader;

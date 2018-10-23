import React, { Component } from "react";
import { Header, HeaderCell } from "./styles";

const AvailabilityCalendarHeader = ({ dates }) => (
  <Header>
    {dates.map((date, i) => {
      const isWeekend = [6,7].indexOf(date.weekday) > -1;

      return (
        <HeaderCell key={i} isWeekend={isWeekend}>
          <h4>{date.format('ddd')}</h4>
          <span>{date.format("DD MMM")}</span>
        </HeaderCell>
      )
    })}
  </Header>
);

export default AvailabilityCalendarHeader;

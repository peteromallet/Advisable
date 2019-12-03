import moment from "moment-timezone";
import React, { Fragment } from "react";
import Text from "src/components/Text";
import Icon from "src/components/Icon";
import Heading from "src/components/Heading";
import illustration from "./illustration.png";
import { Centered, Event } from "./styles";

export default ({ clientName, startsAt, timeZone }) => {
  const date = moment.tz(startsAt, timeZone);

  return (
    <Centered>
      <img width={250} src={illustration} alt="" />
      <Heading marginBottom="xs">Call Scheduled</Heading>
      <Text marginBottom="xl">
        Your call with {clientName} has been scheduled!
      </Text>
      <Event>
        <Icon icon="calendar" />
        <h4>{date.format("dddd, DD MMMM")}</h4>
        <span>
          {date.format("hh:mma")} -{" "}
          {moment(date)
            .add(30, "minutes")
            .format("hh:mma")}
        </span>
      </Event>
    </Centered>
  );
};

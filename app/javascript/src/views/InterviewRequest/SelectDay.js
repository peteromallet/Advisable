import reduce from "lodash/reduce";
import moment from "moment-timezone";
import React, { useState } from "react";
import { Text, Modal, useModal } from "@advisable/donut";
import { Day, RequestMore } from "./styles";
import NoAvailability from "./NoAvailability";
import RequestMoreAvailability from "./RequestMoreAvailability";

const SelectDay = ({ clientName, availability, timeZone, match }) => {
  const modal = useModal();

  const dates = reduce(
    availability,
    (collection, datetime) => {
      const parsed = moment.tz(datetime, timeZone).format("YYYY-MM-DD");
      if (collection.indexOf(parsed) === -1) {
        return [...collection, parsed];
      }
      return collection;
    },
    []
  );

  return (
    <>
      <Text
        as="h1"
        mb="xs"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Call with {clientName}
      </Text>
      <Text lineHeight="s" color="neutral800" mb="l">
        {clientName} has requested a call with you! Please select an available
        day below.
      </Text>

      <Modal label="Request more time" modal={modal}>
        <RequestMoreAvailability
          clientName={clientName}
          interviewID={match.params.interviewID}
          onCancel={modal.hide}
        />
      </Modal>

      {dates.length > 0 && (
        <>
          {dates.map(d => {
            const date = moment.tz(d, timeZone);
            return (
              <Day key={d} to={`${match.url}/${d}`}>
                <h4>{date.format("dddd")}</h4>
                <span>{date.format("DD MMMM YYYY")}</span>
                <svg width={10} height={18} fill="none">
                  <path d="M1 17l8-8-8-8" stroke="#929DC1" />
                </svg>
              </Day>
            );
          })}
          <Text color="neutral900" mb="xxs" mt="l">
            None of these dates work for you?
          </Text>

          <RequestMore onClick={modal.show}>
            Request more availability
          </RequestMore>
        </>
      )}

      {dates.length === 0 && <NoAvailability onRequestMoreTimes={modal.show} />}
    </>
  );
};

export default SelectDay;

import React from "react";
import { DateTime } from "luxon";
import reduce from "lodash/reduce";
import sortBy from "lodash/sortBy";
import { Heading, Text, Modal, useModal } from "@advisable/donut";
import { Day, RequestMore } from "./styles";
import NoAvailability from "./NoAvailability";
import { useLocation } from "react-router";
import SuggestAlternativeTimes from "./SuggestAlternativeTimes";

const SelectDay = ({ account, availability, timeZone }) => {
  const modal = useModal();
  const location = useLocation();
  const { name } = account;

  const dates = reduce(
    availability,
    (collection, datetime) => {
      const parsed = DateTime.fromISO(datetime).toISODate();
      if (collection.indexOf(parsed) === -1) {
        return [...collection, parsed];
      }
      return collection;
    },
    [],
  );

  const sorted = sortBy(dates, (d) => DateTime.fromISO(d).toISODate());

  return (
    <>
      <Heading as="h1" mb={2}>
        Call with {name}
      </Heading>
      <Text fontSize="l" lineHeight="24px" color="neutral800" mb={8}>
        {name} has requested a call with you! Please select an available day
        below.
      </Text>

      <Modal label="Suggest alternative times" modal={modal} width={600}>
        <SuggestAlternativeTimes account={account} modal={modal} />
      </Modal>

      {dates.length > 0 && (
        <>
          {sorted.map((d) => {
            const date = DateTime.fromISO(d, { zone: timeZone });

            return (
              <Day
                key={d}
                to={{
                  ...location,
                  pathname: d,
                }}
              >
                <h4>{date.toFormat("cccc")}</h4>
                <span>{date.toFormat("dd MMM yyyy")}</span>
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
            Suggest alternative times
          </RequestMore>
        </>
      )}

      {dates.length === 0 && <NoAvailability onRequestMoreTimes={modal.show} />}
    </>
  );
};

export default SelectDay;

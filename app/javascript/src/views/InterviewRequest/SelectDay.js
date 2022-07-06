import React from "react";
import { DateTime } from "luxon";
import reduce from "lodash/reduce";
import sortBy from "lodash/sortBy";
import { Heading, Text, Modal, useModal } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import NoAvailability from "./NoAvailability";
import { useLocation, useNavigate } from "react-router";
import SuggestAlternativeTimes from "./SuggestAlternativeTimes";
import Day from "./Day";

const SelectDay = ({ account, availability, timeZone, conversationId }) => {
  const modal = useModal();
  const location = useLocation();
  const navigate = useNavigate();
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
      <div className="mb-2">
        <BackButton to={`/messages/${conversationId}`} />
      </div>
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
        <div className="space-y-2">
          {sorted.map((d) => {
            const date = DateTime.fromISO(d, { zone: timeZone });

            return (
              <Day
                key={d}
                onClick={() => navigate({ ...location, pathname: d })}
                title={date.toFormat("cccc")}
                subText={date.toFormat("dd MMM yyyy")}
              />
            );
          })}

          <Day
            title="None of these dates work for you?"
            subText="Suggest alternative times"
            onClick={modal.show}
          />
        </div>
      )}

      {dates.length === 0 && <NoAvailability onRequestMoreTimes={modal.show} />}
    </>
  );
};

export default SelectDay;

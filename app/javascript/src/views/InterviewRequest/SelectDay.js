import reduce from "lodash/reduce";
import moment from "moment-timezone";
import React, { useState, Fragment } from "react";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import { Day, RequestMore } from "./styles";
import NoAvailability from "./NoAvailability";
import RequestMoreAvailability from "./RequestMoreAvailability";

const SelectDay = ({ clientName, availability, timeZone, match }) => {
  const [requestMoreTimes, setRequestMoreTimes] = useState(false);

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

  const handleRequestMoreAvailability = e => {
    e.preventDefault();
    setRequestMoreTimes(true);
  };

  return (
    <Fragment>
      <Heading size="l" marginBottom="xs">
        Call with {clientName}
      </Heading>
      <Text marginBottom="xl">
        {clientName} has requested a call with you! Please select an available
        day below.
      </Text>

      <RequestMoreAvailability
        clientName={clientName}
        isOpen={requestMoreTimes}
        interviewID={match.params.interviewID}
        onClose={() => setRequestMoreTimes(false)}
      />

      {dates.length > 0 && (
        <Fragment>
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
          <Text size="s" marginTop="xl">
            None of these dates work for you?
          </Text>

          <RequestMore onClick={handleRequestMoreAvailability}>
            Request more availability
          </RequestMore>
        </Fragment>
      )}

      {dates.length === 0 && (
        <NoAvailability onRequestMoreTimes={handleRequestMoreAvailability} />
      )}
    </Fragment>
  );
};

export default SelectDay;

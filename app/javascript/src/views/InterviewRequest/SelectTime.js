import filter from 'lodash/filter';
import moment from "moment-timezone";
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import Text from "src/components/Text";
import Back from "src/components/Back";
import Heading from "src/components/Heading";
import { Times, Time } from './styles';

export default ({ availability, timeZone, match, clientName }) => {
  const date = moment.tz(match.params.date, timeZone)
  const times = filter(availability, d => date.isSame(d, 'day'))

  return (
    <Fragment>
      <Back marginBottom="l" to={`/interview_request/${match.params.interviewID}`}>
        Back
      </Back>
      <Heading size="l" marginBottom="xs">
        {date.format('dddd, DD MMMM')}
      </Heading>
      <Text marginBottom="xl">
        Select a time for your call with {clientName}
      </Text>
      <Times>
        {times.map(time => {
          const parsed = moment.tz(time, timeZone)
          return (
            <Time key={time} to={parsed.format('YYYY-MM-DDTHH:mm')}>
              {parsed.format('hh:mma')}
              {" - "}
              {parsed.add(30, 'minutes').format('hh:mma')}
            </Time>
          )
        })}
      </Times>
    </Fragment>
  )
}

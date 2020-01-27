import React from "react";
import { times } from "lodash";
import { DateTime } from "luxon";
import { Formik, Field } from "formik";
import Icon from "../Icon";
import Box from "../Box";
import Text from "../Text";
import RoundedButton from "../RoundedButton";
import VerticalLayout from "../VerticalLayout";
import { StyledTime, StyledTimeCheckbox } from "./styles";

const AvailabilityFormTimes = ({ selectedDay, formik }) => {
  const dateISO = selectedDay.toISOWeekDate();
  const start = DateTime.fromISO(dateISO, { zone: formik.values.timeZone });

  return times(48, n => {
    const t = start.plus({ minutes: 30 * n });

    return (
      <Box key={n} borderBottom="1px solid" borderColor="neutral.1">
        <StyledTime htmlFor={`time-${n}`}>
          <Field
            type="checkbox"
            id={`time-${n}`}
            name="availability"
            value={t.toUTC().toISO()}
          />
          <StyledTimeCheckbox>
            <Icon
              width={14}
              height={14}
              icon="check"
              color="white.9"
              strokeWidth={2.2}
            />
          </StyledTimeCheckbox>
          {t.toFormat("HH:mma")} → {t.plus({ minutes: 30 }).toFormat("HH:mma")}
        </StyledTime>
      </Box>
    );
  });
};

const AvailabilityForm = ({
  timeZone,
  initialAvailability,
  selectedDay,
  setAvailabilityForDay,
}) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollTo(0, 925);
    }, 10);
  }, []);

  // The intialAvailability might not be the same exact ISO format that luxon
  // outputs. i.e it might be missing miliseconds. Because of this we iterate
  // through the initialAvailability array and use luxon to recreate the ISO
  // so that we know it will be the same as the ISO generated for the checkbox
  // values.
  const asLuxonISOs = initialAvailability.map(iso => {
    return DateTime.fromISO(iso)
      .toUTC()
      .toISO();
  });

  const initialValues = {
    timeZone,
    availability: asLuxonISOs,
  };

  const handleSubmit = values => {
    setAvailabilityForDay(selectedDay, values.availability);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
          <VerticalLayout
            header={
              <Box padding="m" boxShadow="s">
                <Text
                  fontSize="xxl"
                  color="neutral.9"
                  fontWeight="semibold"
                  letterSpacing="-0.02em"
                >
                  {selectedDay.toFormat("cccc, dd MMM yyyy")}
                </Text>
              </Box>
            }
            footer={
              <Box padding="m" boxShadow="s">
                <RoundedButton size="l" type="Submit" width="100%">
                  Set availability for {selectedDay.toFormat("dd MMM")}
                </RoundedButton>
              </Box>
            }
          >
            <div
              style={{ height: "100%", overflowY: "scroll" }}
              ref={scrollRef}
            >
              <AvailabilityFormTimes
                selectedDay={selectedDay}
                formik={formik}
              />
            </div>
          </VerticalLayout>
        </form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;

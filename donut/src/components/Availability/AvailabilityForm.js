import React from "react";
import { times } from "lodash";
import { Formik, Field } from "formik";
import { DateTime } from "luxon";
import Box from "../Box";
import Text from "../Text";
import VerticalLayout from "../VerticalLayout";

const AvailabilityFormTimes = ({ selectedDay, formik }) => {
  const dateISO = selectedDay.toISOWeekDate();
  const start = DateTime.fromISO(dateISO, { zone: formik.values.timeZone });

  return times(48, n => {
    const t = start.plus({ minutes: 30 * n });

    return (
      <Box key={n} px="xs" py="s">
        <Field
          type="checkbox"
          id={`time-${n}`}
          name="availability"
          value={t.toUTC().toISO()}
        />
        <label htmlFor={`time-${n}`}>
          {t.toFormat("hh:mma")} - {t.plus({ minutes: 30 }).toFormat("hh:mma")}
        </label>
      </Box>
    );
  });
};

const AvailabilityForm = ({ initialAvailability, selectedDay }) => {
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

  const localTimeZone = DateTime.local().zoneName;

  const initialValues = {
    timeZone: localTimeZone,
    availability: asLuxonISOs,
  };

  const handleSubmit = values => {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
          <VerticalLayout
            header={
              <Box>
                <Text>{selectedDay.toFormat("cccc, dd MMM yyyy")}</Text>
                <Field as="select" name="timeZone">
                  <option>Europe/Dublin</option>
                  <option>America/Chicago</option>
                  <option>America/New_York</option>
                </Field>
              </Box>
            }
            footer={
              <Box>
                <button>Save</button>
              </Box>
            }
          >
            <AvailabilityFormTimes selectedDay={selectedDay} formik={formik} />
          </VerticalLayout>
        </form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;

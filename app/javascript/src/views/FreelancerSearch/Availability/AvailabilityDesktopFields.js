import React from "react";
import { Field } from "formik";
import { Box, Card, Autocomplete, RoundedButton, Icon } from "@advisable/donut";
import AvailabilityInput from "../../../components/Availability";
import ZONES from "../../../data/timezones";

const TIMEZONE_OPTIONS = ZONES.map(z => ({ label: z, value: z }));

const AvailabilityDesktopFields = ({ formik }) => {
  return (
    <Card padding="m">
      <Field
        as={Autocomplete}
        name="timeZone"
        label="Time Zone"
        options={TIMEZONE_OPTIONS}
        formatInputValue={value => `Timezone: ${value}`}
        onChange={o => {
          formik.setFieldTouched("timeZone", true);
          formik.setFieldValue("timeZone", o.value);
        }}
      />
      <Box my="m" height={280} display="flex" flexShrink={1} flexGrow={1}>
        <AvailabilityInput
          selected={formik.values.availability}
          timeZone={formik.values.timeZone}
          onSelect={a => {
            formik.setFieldTouched("availability", true);
            formik.setFieldValue("availability", a);
          }}
        />
      </Box>

      <RoundedButton
        type="submit"
        width={["100%", "auto"]}
        disabled={formik.values.availability.length < 6}
        loading={formik.isSubmitting}
        suffix={<Icon icon="arrow-right" />}
      >
        Continue
      </RoundedButton>
    </Card>
  );
};

export default AvailabilityDesktopFields;

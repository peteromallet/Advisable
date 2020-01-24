import React from "react";
import { Field } from "formik";
import {
  Box,
  Select,
  Availability,
  RoundedButton,
  Icon,
} from "@advisable/donut";
import ZONES from "../../../data/timezones";

const AvailabilityMobileFields = ({ formik }) => {
  return (
    <>
      <Field as={Select} name="timeZone" mb="l">
        {ZONES.map(zone => (
          <option key={zone}>{zone}</option>
        ))}
      </Field>
      <Box mx="-20px" mb="xxl">
        <Availability
          value={formik.values.availability}
          onChange={a => formik.setFieldValue("availability", a)}
        />
      </Box>
      <RoundedButton
        size="l"
        type="submit"
        width={["100%", "auto"]}
        disabled={formik.values.availability.length < 6}
        loading={formik.isSubmitting}
        suffix={<Icon icon="arrow-right" />}
      >
        Continue
      </RoundedButton>
    </>
  );
};

export default AvailabilityMobileFields;

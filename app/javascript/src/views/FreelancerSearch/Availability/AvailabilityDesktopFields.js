import React from "react";
import { Field } from "formik";
import { Box, Card, Autocomplete, Button } from "@advisable/donut";
import AvailabilityInput from "../../../components/AvailabilityInput";
import ZONES from "../../../data/timezones";
import { ArrowRight } from "@styled-icons/feather";

const TIMEZONE_OPTIONS = ZONES.map((z) => ({ label: z, value: z }));

const AvailabilityDesktopFields = ({ formik }) => {
  return (
    <Card padding="m">
      <Field
        as={Autocomplete}
        name="timeZone"
        options={TIMEZONE_OPTIONS}
        formatInputValue={(value) => `Timezone: ${value}`}
        onChange={(o) => {
          formik.setFieldTouched("timeZone", true);
          formik.setFieldValue("timeZone", o.value);
        }}
      />
      <Box
        width="100%"
        my="m"
        height={320}
        display="flex"
        flexShrink={1}
        flexGrow={1}
      >
        <AvailabilityInput
          maxHeight="100%"
          value={formik.values.availability}
          timezone={formik.values.timeZone}
          onChange={(a) => {
            formik.setFieldTouched("availability", true);
            formik.setFieldValue("availability", a);
          }}
        />
      </Box>

      <Button
        type="submit"
        width={["100%", "auto"]}
        disabled={formik.values.availability.length < 6}
        loading={formik.isSubmitting}
        suffix={<ArrowRight />}
      >
        Continue
      </Button>
    </Card>
  );
};

export default AvailabilityDesktopFields;

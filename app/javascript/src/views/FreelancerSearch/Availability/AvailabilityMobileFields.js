import { Field } from "formik";
import { ArrowRight } from "@styled-icons/feather";
import { Box, Select, Availability, Button, Text } from "@advisable/donut";
import ZONES from "../../../data/timezones";

const AvailabilityMobileFields = ({ formik }) => {
  return (
    <>
      <Field as={Select} name="timeZone" mb="l">
        {ZONES.map((zone) => (
          <option key={zone}>{zone}</option>
        ))}
      </Field>
      <Box mx="-20px" mb="xxl">
        <Availability
          value={formik.values.availability}
          onChange={(a) => formik.setFieldValue("availability", a)}
        />
      </Box>
      <Button
        size="l"
        type="submit"
        width={["100%", "auto"]}
        disabled={formik.values.availability.length < 6}
        loading={formik.isSubmitting}
        suffix={<ArrowRight />}
      >
        Continue
      </Button>
      {formik.values.availability.length < 6 ? (
        <Text mt="s">
          Please select at least 6 times that you will be available for a call.
        </Text>
      ) : null}
    </>
  );
};

export default AvailabilityMobileFields;

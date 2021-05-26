import React from "react";
import { object, array } from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Info } from "@styled-icons/feather/Info";
import { Card, Box, Text, Button, Combobox } from "@advisable/donut";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import AvailabilityInput from "../../components/AvailabilityInput";
import ZONES from "../../components/TimeZoneSelect/zones";
import useWindowSize from "../../utilities/useWindowSize";
import UPDATE_AVAILABILITY from "./updateAvailability";
import { useConsultation } from "./queries";

const TIMEZONE_OPTIONS = ZONES.map((z) => ({ label: z, value: z }));

const validationSchmea = object({
  availability: array().min(5),
});

const Availability = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);

  const { height } = useWindowSize();

  const { data, loading } = useConsultation({
    variables: { id: location.state?.consultationId },
    skip: !location.state?.consultationId,
  });

  const user = data?.consultation.user;

  if (!location.state?.consultationId) {
    return (
      <Redirect
        to={{
          pathname: `/request_consultation/${params.specialistId}/skills`,
          state: location.state,
        }}
      />
    );
  }

  if (loading) return <Loading />;

  const specialist = data.consultation.specialist;

  const handleSubmit = async (input) => {
    await updateAvailability({
      variables: { input: { ...input, timeZone: input.timeZone.value } },
    });

    history.push({
      pathname: `/request_consultation/${params.specialistId}/topic`,
      state: {
        ...location.state,
        completed: [...(location?.state?.completed || []), "AVAILABILITY"],
      },
    });
  };

  const initialTimeZone =
    user?.timeZone || Intl.DateTimeFormat()?.resolvedOptions()?.timeZone || "";

  const initialValues = {
    timeZone: { value: initialTimeZone, label: initialTimeZone },
    availability: user?.availability || [],
  };

  return (
    <Card padding={[4, 6, 8]} borderRadius="12px">
      <Box
        height={[height - 58, "auto"]}
        display={["flex", "block"]}
        flexDirection="column"
        flex="1 1 0%"
      >
        <Formik
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchmea={validationSchmea}
        >
          {(formik) => (
            <Form>
              <Box pb="m" flexShrink={1} paddingBottom="s">
                <Text
                  mb={2}
                  as="h2"
                  fontSize="4xl"
                  fontWeight="600"
                  color="neutral900"
                  letterSpacing="-0.05rem"
                >
                  Availability
                </Text>
                <Text color="neutral800" lineHeight="1.3" mb={8}>
                  Select the times you will be available for a consultation with{" "}
                  {specialist.name}. The more times you select, the easier
                  it&apos;ll be for us to find a time that suits them.
                </Text>
                <Field
                  as={Combobox}
                  name="timeZone"
                  label="Time Zone"
                  options={TIMEZONE_OPTIONS}
                  formatInputValue={(value) => `Timezone: ${value.label}`}
                  onChange={(o) => {
                    formik.setFieldTouched("timeZone", true);
                    formik.setFieldValue("timeZone", o);
                  }}
                />
              </Box>
              <Box
                height={["100%", 300]}
                display="flex"
                flexShrink={1}
                flexGrow={1}
              >
                <AvailabilityInput
                  value={formik.values.availability}
                  timezone={formik.values.timeZone.value}
                  onChange={(a) => {
                    formik.setFieldTouched("availability", true);
                    formik.setFieldValue("availability", a);
                  }}
                />
              </Box>
              <Box pt="m" flexShrink={1}>
                {formik.values.availability.length < 5 && (
                  <Box
                    p="xs"
                    mb="s"
                    fontSize="s"
                    bg="neutral50"
                    display="flex"
                    borderRadius={8}
                    color="neutral700"
                    alignItems="center"
                  >
                    <Box display="inline-block" mr="xs" color="neutral500">
                      <Info size={20} strokeWidth={2} />
                    </Box>
                    Please select at least 5 available times
                  </Box>
                )}
                <Button
                  type="submit"
                  width={["100%", "auto"]}
                  disabled={formik.values.availability.length < 5}
                  loading={formik.isSubmitting}
                  suffix={<ArrowRight />}
                >
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default Availability;

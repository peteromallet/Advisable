import React from "react";
import { object, array } from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { Info, ArrowRight } from "@styled-icons/feather";
import { Card, Box, Text, Button, Autocomplete } from "@advisable/donut";
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

  const handleSubmit = async (values) => {
    await updateAvailability({
      variables: {
        input: {
          id: user.id,
          ...values,
        },
      },
    });

    history.push({
      pathname: `/request_consultation/${params.specialistId}/topic`,
      state: {
        ...location.state,
        completed: [...(location?.state?.completed || []), "AVAILABILITY"],
      },
    });
  };

  const initialValues = {
    timeZone:
      user?.timeZone ||
      Intl.DateTimeFormat()?.resolvedOptions()?.timeZone ||
      "",
    availability: user?.availability || [],
  };

  return (
    <Card padding={["m", "l"]}>
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
                  mb="xs"
                  as="h2"
                  fontSize="xxl"
                  fontWeight="semibold"
                  color="blue.8"
                  letterSpacing="-0.025em"
                >
                  Availability
                </Text>
                <Text color="neutral.8" lineHeight="s" mb="m">
                  Select the times you will be available for a consultation with{" "}
                  {specialist.name}. The more times you select, the easier it'll
                  be for us to find a time that suits them.
                </Text>
                <Field
                  as={Autocomplete}
                  name="timeZone"
                  label="Time Zone"
                  options={TIMEZONE_OPTIONS}
                  formatInputValue={(value) => `Timezone: ${value}`}
                  onChange={(o) => {
                    formik.setFieldTouched("timeZone", true);
                    formik.setFieldValue("timeZone", o.value);
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
                  timezone={formik.values.timeZone}
                  onChange={(a) => {
                    formik.setFieldTouched("availability", true);
                    formik.setFieldValue("availability", a);
                  }}
                />
              </Box>
              <Box pt="m" flexShrink={1}>
                {formik.values.availability.length < 6 && (
                  <Box
                    p="xs"
                    mb="s"
                    fontSize="s"
                    bg="neutral.0"
                    display="flex"
                    borderRadius={8}
                    color="neutral.7"
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
                  disabled={formik.values.availability.length < 6}
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

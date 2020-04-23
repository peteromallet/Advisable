import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { Icon, Box, Text, Button, Autocomplete } from "@advisable/donut";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import AvailabilityInput from "../../components/Availability";
import ZONES from "../../components/TimeZoneSelect/zones";
import useWindowSize from "../../utilities/useWindowSize";
import UPDATE_AVAILABILITY from "./updateAvailability";
import { useConsultation } from "./queries";

const TIMEZONE_OPTIONS = ZONES.map((z) => ({ label: z, value: z }));

const validationSchmea = Yup.object({
  availability: Yup.array().min(6),
});

const Availability = ({ previousStepURL }) => {
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
    return <Redirect to={previousStepURL(params)} />;
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
            <Box
              flexShrink={1}
              px={["m", "l"]}
              pt={["m", "l"]}
              paddingBottom="s"
            >
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
                selected={formik.values.availability}
                timeZone={formik.values.timeZone}
                onSelect={(a) => {
                  formik.setFieldTouched("availability", true);
                  formik.setFieldValue("availability", a);
                }}
              />
            </Box>
            <Box padding={["m", "l"]} flexShrink={1}>
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
                  <Icon icon="info" width={20} color="neutral.6" mr="xs" />
                  Please select at least 3 available times
                </Box>
              )}
              <Button
                type="submit"
                width={["100%", "auto"]}
                disabled={formik.values.availability.length < 6}
                loading={formik.isSubmitting}
                suffix={<Icon icon="arrow-right" />}
              >
                Continue
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Availability;

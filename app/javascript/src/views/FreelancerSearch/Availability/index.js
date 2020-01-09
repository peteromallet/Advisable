import React from "react";
import {
  Box,
  Text,
  Card,
  Autocomplete,
  RoundedButton,
  Icon,
} from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation } from "react-apollo";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import useViewer from "../../../hooks/useViewer";
import Loading from "../../../components/Loading";
import ZONES from "../../../components/TimeZoneSelect/zones";
import AvailabilityInput from "../../../components/Availability";
import GET_AVAILABILITY from "./getUserAvailability";
import UPDATE_AVAILABILITY from "./updateAvailability";

const TIMEZONE_OPTIONS = ZONES.map(z => ({ label: z, value: z }));

const Availability = () => {
  const viewer = useViewer();
  const history = useHistory();
  const location = useLocation();
  const selected = location.state?.freelancers || [];
  const { data, loading } = useQuery(GET_AVAILABILITY);
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);

  if (selected.length === 0) {
    return <Redirect to="/freelancer_search/results" />;
  }

  if (loading) {
    return <Loading />;
  }

  const initialValues = {
    timeZone:
      data?.viewer.timeZone ||
      Intl.DateTimeFormat()?.resolvedOptions()?.timeZone ||
      "",
    availability: data?.viewer.availability || [],
  };

  const handleSubmit = async values => {
    await updateAvailability({
      variables: {
        input: {
          id: viewer.id,
          ...values,
        },
      },
    });

    history.push({
      ...location,
      pathname: "/freelancer_search/topic",
    });
  };

  return (
    <Box maxWidth={700} mx="auto">
      <Text
        as="h1"
        mb="xs"
        color="blue.9"
        fontSize="xxl"
        fontWeight="bold"
        letterSpacing="-0.01em"
      >
        Availability
      </Text>
      <Text lineHeight="s" color="neutral.8" mb="l">
        Select the times you will be availabile for a consultation. The more
        times you select, the easier it'll be for us to find a time that suits
        them.
      </Text>
      <Card padding="m">
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {formik => (
            <Form>
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
              <Box
                my="m"
                height={["100%", 280]}
                display="flex"
                flexShrink={1}
                flexGrow={1}
              >
                <AvailabilityInput
                  selected={formik.values.availability}
                  timeZone={formik.values.timeZone}
                  onSelect={a => {
                    formik.setFieldTouched("availability", true);
                    formik.setFieldValue("availability", a);
                  }}
                />
              </Box>

              {console.log("A", formik)}
              <RoundedButton
                type="submit"
                width={["100%", "auto"]}
                disabled={formik.values.availability.length < 6}
                loading={formik.isSubmitting}
                suffix={<Icon icon="arrow-right" />}
              >
                Continue
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Availability;

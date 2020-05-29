import React from "react";
import { Formik, Form } from "formik";
import { DateTime } from "luxon";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Box,
  Modal,
  Text,
  Button,
  useBreakpoint,
  Availability,
} from "@advisable/donut";
import Loading from "src/components/Loading";
import { useNotifications } from "src/components/Notifications";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import AvailabilityInput from "src/components/AvailabilityInput";
import validationSchema from "./validationSchema";
import { GET_AVAILABILITY, REQUEST_INTRODUCTION } from "./queries";

function RequestIntroductionModal({ modal, ...props }) {
  return (
    <Modal
      modal={modal}
      height="100%"
      width={700}
      padding={["m", "l"]}
      tabIndex={0}
    >
      <RequestIntroduction modal={modal} {...props} />
    </Modal>
  );
}

function RequestIntroduction({ modal, application }) {
  const sUp = useBreakpoint("sUp");
  const notifications = useNotifications();
  const [requestIntroduction] = useMutation(REQUEST_INTRODUCTION);
  const { data, loading } = useQuery(GET_AVAILABILITY, {
    variables: { id: application.airtableId },
    skip: !modal.visible,
  });

  const specialist = application.specialist;

  if (loading) return <Loading />;

  const initialValues = {
    availability: data.application.project.user.availability,
    timeZone: DateTime.local().zoneName || "Europe/Dublin",
  };

  const handleSubmit = async (values) => {
    await requestIntroduction({
      variables: {
        input: {
          applicationId: application.airtableId,
          ...values,
        },
      },
    });

    notifications.notify(
      `An interview request has been sent to ${specialist.name}`,
    );

    modal.hide();
  };

  const filterTimes = (times) => {
    return times.filter((time) => {
      return DateTime.fromISO(time) > DateTime.local().endOf("day");
    });
  };

  const events = data.application.project.user.interviews.map((interview) => ({
    time: interview.startsAt,
    label: `Interview ${interview.specialist.firstName}`,
  }));

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form style={{ height: "100%" }}>
          <Box display="flex" flexDirection="column" height="100%">
            <Box flexShrink={0} flexGrow={0}>
              <Text
                mb="8px"
                color="blue900"
                fontSize="24px"
                fontWeight="medium"
                letterSpacing="-0.03em"
              >
                Request Call
              </Text>
              <Text color="neutral800" lineHeight="20px" mb="m">
                Select the times you will be available for a call with{" "}
                {specialist.name}. The more times you select, the easier it’ll
                be for us to find a time that suits them.
              </Text>
              <TimeZoneSelect
                mb="m"
                value={formik.values.timeZone}
                onChange={(zone) => {
                  formik.setFieldValue("timeZone", zone);
                }}
              />
            </Box>
            <Box flexGrow={1} flexShrink={1} height="0px">
              {sUp ? (
                <AvailabilityInput
                  maxHeight="100%"
                  events={events}
                  timezone={formik.values.timeZone}
                  value={filterTimes(formik.values.availability)}
                  onChange={(times) => {
                    formik.setFieldValue("availability", times);
                  }}
                />
              ) : (
                <Availability
                  timezone={formik.values.timeZone}
                  value={filterTimes(formik.values.availability)}
                  onChange={(times) => {
                    formik.setFieldValue("availability", times);
                  }}
                />
              )}
            </Box>
            <Box pt="m" flexGrow={0} flexShink={0}>
              {formik.values.availability.length < 5 && (
                <>
                  <Text fontSize="xs" fontWeight="medium" color="neutral700">
                    Please select at least 5 available times
                  </Text>
                  {sUp && (
                    <Text fontSize="xs" color="neutral600" lineHeight="18px">
                      Tip: You can click and drag to select multiple times at
                      once.
                    </Text>
                  )}
                </>
              )}
              <Button
                mt="s"
                type="submit"
                size={["l", "m"]}
                width={sUp ? "auto" : "100%"}
                disabled={formik.values.availability.length < 5}
                loading={formik.isSubmitting}
              >
                Request Call
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default RequestIntroductionModal;

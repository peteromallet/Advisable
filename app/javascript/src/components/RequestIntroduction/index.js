import React from "react";
import { filter } from "lodash-es";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { Button } from "@advisable/donut";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Modal from "src/components/Modal";
import Text from "src/components/Text";
import Loading from "src/components/Loading";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import { withNotifications } from "src/components/Notifications";
import { Mobile } from "src/components/Breakpoint";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import Availability from "src/components/Availability";
import { Form, Header, Body, Footer } from "./styles";
import validationSchema from "./validationSchema";

import REQUEST_INTRO from "./requestIntroduction.graphql";
import FETCH_AVAILABILITY from "./fetchAvailability.graphql";

function RequestIntroductionModal(props) {
  const notifications = props.notifications;
  const application = props.application;
  const specialist = application.specialist;
  const [submitted, setSubmitted] = React.useState(false);
  const [requestIntroduction] = useMutation(REQUEST_INTRO);
  const { data, loading } = useQuery(FETCH_AVAILABILITY, {
    variables: { id: application.airtableId },
    skip: !props.isOpen,
  });

  return (
    <Modal
      size="l"
      isOpen={props.isOpen}
      onClose={props.onClose}
      expandOnMobile
    >
      <Mobile>
        {(isMobile) => {
          if (loading) return <Loading />;

          const initialValues = {
            availability: data.application.project.user.availability,
            timeZone: DateTime.local().zoneName || "Europe/Dublin",
          };

          return (
            <Formik
              validateOnMount
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
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

                props.onClose();
              }}
              render={(formik) => (
                <Form
                  style={{
                    height: isMobile ? "100%" : 600,
                    maxHeight: "100%",
                  }}
                  onSubmit={formik.handleSubmit}
                >
                  <Header>
                    <Heading marginBottom="xs">Request Call</Heading>
                    <Text size={"s"} marginBottom="l" block>
                      Select the times you will be available for a call with{" "}
                      {specialist.name}. The more times you select, the easier
                      it’ll be for us to find a time that suits them.
                    </Text>
                    <TimeZoneSelect
                      value={formik.values.timeZone}
                      onChange={(zone) => {
                        formik.setFieldValue("timeZone", zone);
                      }}
                    />
                  </Header>
                  <Body>
                    <Availability
                      timeZone={formik.values.timeZone}
                      selected={filter(formik.values.availability, (t) => {
                        return (
                          DateTime.fromISO(t) > DateTime.local().endOf("day")
                        );
                      })}
                      onSelect={(times) => {
                        formik.setFieldValue("availability", times);
                      }}
                    />
                  </Body>
                  <Footer>
                    <Spacing padding="xl" paddingTop="l" paddingBottom="l">
                      {submitted && !isMobile && formik.errors.availability && (
                        <Text size="s" marginBottom="s">
                          {formik.errors.availability}
                        </Text>
                      )}

                      {!(isMobile && !formik.isValid) && (
                        <Button
                          size="l"
                          type="submit"
                          loading={formik.isSubmitting}
                          onClick={() => setSubmitted(true)}
                        >
                          Request Call
                        </Button>
                      )}

                      {isMobile && !formik.isValid && (
                        <Text size="s" center>
                          Select at least 3 available times
                        </Text>
                      )}
                    </Spacing>
                  </Footer>
                </Form>
              )}
            />
          );
        }}
      </Mobile>
    </Modal>
  );
}

export default withNotifications(RequestIntroductionModal);

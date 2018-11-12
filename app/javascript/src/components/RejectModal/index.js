import React from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Modal from "src/components/Modal";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Select from "src/components/Select";
import Button from "src/components/Button";
import TextField from "src/components/TextField";
import { withNotifications } from "src/components/Notifications";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";

import { Container } from "./styles";
import REJECT from "./reject.graphql";

// Takes a given application record and returns an array of rejection reasons. This is
// needed becuase we only show the "I just want to see more candidates" reason when
// the application status is Applied.
const optionsForApplication = application => {
  const options = [
    "I want someone with more relevant experience",
    "I want someone cheaper",
    "I didn't like their answers",
    "They just don't seem like a good fit"
  ];

  if (application.status === "Applied") {
    options.push("I just want to see more candidates");
  }

  return options;
};

// Defines the placeholder holder values for the optionsn that require a rejectionReasonComment
const PLACEHOLDERS = {
  "I want someone with more relevant experience":
    "In what way would their experience be different?",
  "I want someone cheaper": "Please describe what price range you had in mind",
  "I didn't like their answers":
    "Please describe information you felt was missing in these answers.",
  "They just don't seem like a good fit":
    "Please describe what a better candidate would look like."
};

// Renders the correct content for the selected option. This is required because for the
// "I just want to see more" option we render a different CTA.
const SelectedOption = ({ formik, onClose, onRequestCall }) => {
  switch (formik.values.rejectionReason) {
    case undefined: {
      return null;
    }

    case "I just want to see more candidates": {
      return (
        <React.Fragment>
          <Text size="s" marginBottom="m" marginTop="m">
            We encourage you to talk to relevant candidates as they come in.
            This ensures that that they’re still available and lets us calibrate
            the search ASAP.
          </Text>
          <Button onClick={onRequestCall} size="l" type="button" primary>
            Request Call
          </Button>
        </React.Fragment>
      );
    }

    default: {
      return (
        <React.Fragment>
          <TextField
            block
            multiline
            autoFocus
            name="rejectionReasonComment"
            marginTop="m"
            marginBottom="m"
            onBlur={formik.handleBlur}
            error={
              formik.submitCount > 0 && formik.errors.rejectionReasonComment
            }
            value={formik.values.rejectionReasonComment}
            onChange={formik.handleChange}
            placeholder={PLACEHOLDERS[formik.values.rejectionReason]}
          />
          <ButtonGroup fullWidth>
            <Button
              primary
              block
              size="l"
              type="submit"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Reject
            </Button>
            <Button size="l" type="button" block onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </React.Fragment>
      );
    }
  }
};

const RejectModal = ({ application, isOpen, onClose, notifications, onRequestCall }) => {
  const specialist = application.specialist;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Mutation mutation={REJECT}>
        {reject => (
          <Formik
            validationSchema={validationSchema}
            onSubmit={async values => {
              await reject({
                variables: {
                  input: {
                    id: application.airtableId,
                    ...values
                  }
                }
              });

              notifications.notify(`${specialist.name} has been declined`);

              onClose();
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <Container>
                  <Heading marginBottom="xs">Reject {specialist.name}</Heading>
                  <Text marginBottom="xl">
                    Please provide feedback to our recruitment team to help us
                    find you a better candidate
                  </Text>
                  <Select
                    block
                    name="rejectionReason"
                    value={formik.values.rejectionReason}
                    onChange={formik.handleChange}
                    placeholder="Select reason for rejection"
                    options={optionsForApplication(application)}
                  />
                  <SelectedOption formik={formik} onClose={onClose} onRequestCall={onRequestCall} />
                </Container>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </Modal>
  );
};

export default withNotifications(RejectModal);

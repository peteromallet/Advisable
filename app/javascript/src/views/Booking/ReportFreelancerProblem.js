import React from "react";
import { object, string } from "yup";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Flag } from "@styled-icons/heroicons-outline/Flag";
import { DialogDisclosure } from "reakit/Dialog";
import FormField from "src/components/FormField";
import { useNotifications } from "src/components/Notifications";
import SubmitButton from "src/components/SubmitButton";
import { Text, Button, useModal, Modal, Textarea } from "@advisable/donut";

const validationSchema = object().shape({
  message: string().required("Please describe the issue you are having"),
});

const REPORT_PROBLEM = gql`
  mutation flagProblematicSpecialist($input: FlagProblematicSpecialistInput!) {
    flagProblematicSpecialist(input: $input) {
      success
    }
  }
`;

function ReportFreelancerProblemModal({ modal, application }) {
  const { notify, error } = useNotifications();
  const freelancerName = application.specialist.firstName;
  const [report] = useMutation(REPORT_PROBLEM);

  const initialValues = {
    message: "",
  };

  const handleSubmit = async (values) => {
    const { errors } = await report({
      variables: {
        input: {
          applicationId: application.id,
          message: values.message,
        },
      },
    });

    if (errors) {
      error("Something went wrong, please try again");
    } else {
      modal.hide();
      notify(
        `We have received your report. We will reach out to ${freelancerName} and get back to you shortly.`,
      );
    }
  };

  return (
    <Modal modal={modal} label="Report an issue">
      <Text
        fontSize="4xl"
        fontWeight="medium"
        marginBottom={2}
        letterSpacing="-0.02rem"
      >
        Report an issue
      </Text>
      <Text lineHeight="1.2rem" marginBottom={5}>
        Having troubles with {freelancerName}? Let us know what the problem is
        and we will reach out to them to try and fix it.
      </Text>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField
            minRows={3}
            name="message"
            as={Textarea}
            marginBottom={3}
            placeholder="Please describe the problem you are having"
          />
          <Text
            fontSize="xs"
            marginBottom={6}
            color="neutral700"
            lineHeight="1.2rem"
          >
            This message will be sent to the Advisable team, not{" "}
            {freelancerName}.
          </Text>
          <SubmitButton variant="dark" mr={2} disableUntilValid>
            Report Issue
          </SubmitButton>
          <Button type="button" variant="subtle" onClick={modal.hide}>
            Cancel
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
}

export default function ReportFreelancerProblem({ application }) {
  const modal = useModal();
  return (
    <>
      <DialogDisclosure
        as={Button}
        {...modal}
        width="100%"
        align="left"
        prefix={<Flag />}
        variant="subtle"
      >
        Report Issue
      </DialogDisclosure>
      <ReportFreelancerProblemModal modal={modal} application={application} />
    </>
  );
}

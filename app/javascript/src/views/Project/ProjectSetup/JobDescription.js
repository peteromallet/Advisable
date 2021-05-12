import React from "react";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Formik, Form, Field } from "formik";
import upperFirst from "src/utilities/upperFirst";
import {
  Box,
  Text,
  Error,
  Button,
  Modal,
  DialogDisclosure,
  useModal,
} from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import BulletPointInput from "src/components/BulletPointInput";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { setupProgress } from "./SetupSteps";

const ConfirmationModal = ({ modal, formik }) => {
  return (
    <Modal modal={modal} label="give a quality overview">
      <Box padding={2} paddingBottom={3}>
        <Text
          as="h2"
          fontSize="3xl"
          color="blue900"
          fontWeight="medium"
          mb={3}
          lineHeight="xl"
        >
          Please try to give a quality overview of your expectations.
        </Text>
        <Text color="neutral900" mb={6} lineHeight="s">
          Try to give at least one more goal that defines the scope of this
          project, it will be helpful to our candidates to fully understand the
          project.
        </Text>
        <Button mr={3} onClick={modal.hide} disabled={formik.isSubmitting}>
          Update
        </Button>
        <Button
          variant="subtle"
          loading={formik.isSubmitting}
          onClick={() => {
            modal.hide();
            formik.handleSubmit();
          }}
        >
          Ignore
        </Button>
      </Box>
    </Modal>
  );
};

export default function JobDescription({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const goalMaxLength = 375;
  const modal = useModal();

  if (!setupProgress(data.project).requiredCharacteristics) {
    return <Redirect to={`/projects/${id}/setup/characteristics`} />;
  }

  const { primarySkill } = data.project;

  const initialValues = {
    goals: data.project.goals,
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to update description, please try again.");
    } else {
      if (location.state?.readyToPublish) {
        history.push(`/projects/${id}/setup/publish`);
      } else {
        history.push(`/projects/${id}/setup/likely_to_hire`);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <ConfirmationModal modal={modal} formik={formik} />
          <JobSetupStepHeader mb={2}>
            Briefly describe your goals from working with this specialist
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb={6}>
            We&apos;ll make sure that specialists we match you with have
            experience helping companies achieve similar goals.
          </JobSetupStepSubHeader>
          <Field
            name="goals"
            as={BulletPointInput}
            marginBottom={3}
            placeholder={
              primarySkill?.goalPlaceholder ||
              "e.g Building a Facebook advertising campaign for launching our new product"
            }
            onChange={(items) =>
              formik.setFieldValue(
                "goals",
                items.map((item) => {
                  const errorStatus =
                    item.length > goalMaxLength
                      ? `The goal can't be longer than ${goalMaxLength} characters`
                      : null;
                  formik.setStatus(errorStatus);
                  const capped = item.substring(0, goalMaxLength);
                  return upperFirst(capped);
                }),
              )
            }
          />
          {formik.status && <Error mb={1}>{formik.status}</Error>}
          {formik.values.goals.length > 1 ? (
            <SubmitButton size="l" marginTop={3} suffix={<ArrowRight />}>
              Continue
            </SubmitButton>
          ) : (
            <DialogDisclosure
              as={Button}
              size="l"
              marginTop={3}
              suffix={<ArrowRight />}
              disabled={formik.values.goals.length === 0}
              loading={formik.isSubmitting}
              {...modal}
            >
              Continue
            </DialogDisclosure>
          )}
        </Form>
      )}
    </Formik>
  );
}

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
    <Modal modal={modal} label="Be more specific">
      <Box padding={2} paddingBottom={3}>
        <Text
          as="h2"
          fontSize="3xl"
          color="blue900"
          fontWeight="medium"
          mb={3}
          lineHeight="xl"
        >
          Please try to be more specific in your description.
        </Text>
        <Text color="neutral900" mb={6} lineHeight="s">
          A project that attracts the best candidates has at least two
          well-presented characteristics stated by the client.
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

export default function JobCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const modal = useModal();

  if (!setupProgress(data.project).location) {
    return <Redirect to={`/projects/${id}/setup/location`} />;
  }

  const { primarySkill } = data.project;

  const initialValues = {
    characteristics: data.project.characteristics,
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
      formik.setStatus("Failed to update characteristics, please try again.");
    } else {
      history.push({
        ...location,
        pathname: `/projects/${id}/setup/required_characteristics`,
      });
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <ConfirmationModal modal={modal} formik={formik} />
          <JobSetupStepHeader mb="xs">
            What characteristics should this specialist have?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            We&apos;ll check this list against every specialist we match you
            with.
          </JobSetupStepSubHeader>
          <Field
            name="characteristics"
            as={BulletPointInput}
            marginBottom="xl"
            autoFocus
            placeholder={
              primarySkill?.characteristicPlaceholder ||
              "e.g Strong communication skills"
            }
            onChange={(items) =>
              formik.setFieldValue(
                "characteristics",
                items.map((i) => upperFirst(i)),
              )
            }
          />
          {formik.values.characteristics.length > 1 ? (
            <SubmitButton size="l" suffix={<ArrowRight />}>
              Continue
            </SubmitButton>
          ) : (
            <DialogDisclosure
              as={Button}
              size="l"
              suffix={<ArrowRight />}
              disabled={formik.values.characteristics.length === 0}
              loading={formik.isSubmitting}
              {...modal}
            >
              Continue
            </DialogDisclosure>
          )}
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}

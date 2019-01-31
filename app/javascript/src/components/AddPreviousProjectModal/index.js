import { Formik } from "formik";
import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import ClientDetails from "./ClientDetails";
import ProjectDetails from "./ProjectDetails";
import Results from "./Results";
import Reference from "./Reference";
import SKILLS from "./skills.graphql";
import CREATE_OFF_PLATFORM_PROJECT from "./createOffPlatformProject.graphql";

const STEPS = [ClientDetails, ProjectDetails, Results, Reference];

const blankProject = {
  clientName: "",
  confidential: false,
  industry: "",
  clientDescription: "",
  skills: [],
  requirements: "",
  description: "",
  results: "",
  contactName: "",
  contactEmail: "",
  canContact: true,
  contactJobTitle: "",
  validationMethod: "Client",
  validationUrl: "",
};

const AddPreviousProjectModal = ({ specialistId, isOpen, onClose, data, mutate }) => {
  const [values, setValues] = useState(blankProject);
  const [stepIndex, setStepIndex] = useState(0);

  const Step = STEPS[stepIndex];

  const handleSubmit = async (values, formikBag) => {
    const isLastStep = stepIndex === STEPS.length - 1;
    if (isLastStep) {
      await mutate({
        variables: {
          input: {
            specialistId,
            ...values
          }
        }
      })

      setStepIndex(0);
      formikBag.resetForm({})
      onClose();
    } else {
      formikBag.setTouched({});
      formikBag.setSubmitting(false);
      setValues(values);
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      enableReinitialize={false}
      validationSchema={Step.validationSchema}
    >
      {formik => (
        <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
          {data.loading ? (
            <Loading />
          ) : (
            <Step
              formik={formik}
              skills={data.skills}
              gotoNextStep={_ => setStepIndex(stepIndex + 1)}
              gotoPreviousStep={_ => setStepIndex(stepIndex - 1)}
            />
          )}
        </Modal>
      )}
    </Formik>
  );
};

export default compose(
  graphql(SKILLS),
  graphql(CREATE_OFF_PLATFORM_PROJECT, {
    options: props => ({
      update: props.mutationUpdate
    })
  })
)(AddPreviousProjectModal);

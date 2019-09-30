// Renders the modal for adding a previous project reference.
import { Formik } from "formik";
import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import ClientDetails from "./ClientDetails";
import ProjectDetails from "./ProjectDetails";
import Reference from "./Reference";
import FETCH_DATA from "./fetchData";
import CREATE_OFF_PLATFORM_PROJECT from "./createOffPlatformProject.graphql";

// Build an array of components for each step in the form. Each of these steps
// are just components that are imported above.
const STEPS = [ClientDetails, ProjectDetails, Reference];

const blankProject = {
  clientName: "",
  confidential: false,
  industry: "",
  skills: [],
  description: "",
  companyType: "",
  publicUse: true,
  contactName: "",
  contactJobTitle: "",
};

const AddPreviousProjectModal = ({
  specialistId, // the component expects to receive the specialist id as a prop
  isOpen, // a boolean value that is passed to the Modal isOpen prop
  onClose, // a function that should be called to close the modal.
  data, // The resulting data from the graphql call to fetch skills and inudstries
  createProject, // The mutation that should be called to create the project
  onCreate = () => {},
}) => {
  // Use react state to keep track of the overall state.
  const [values, setValues] = useState(blankProject);
  // We keep track of which step is currently being displayed via a 'stepIndex'.
  const [stepIndex, setStepIndex] = useState(0);
  // Get the current step from the STEPS array.
  const Step = STEPS[stepIndex];

  const handleSubmit = async (values, formikBag) => {
    const isLastStep = stepIndex === STEPS.length - 1;
    if (isLastStep) {
      await createProject({
        variables: {
          input: {
            ...values,
            specialistId,
          },
        },
      });

      setStepIndex(0);
      formikBag.resetForm(blankProject);
      onCreate();
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
              industries={data.industries}
              gotoNextStep={() => setStepIndex(stepIndex + 1)}
              gotoPreviousStep={() => setStepIndex(stepIndex - 1)}
            />
          )}
        </Modal>
      )}
    </Formik>
  );
};

export default compose(
  graphql(FETCH_DATA),
  graphql(CREATE_OFF_PLATFORM_PROJECT, {
    name: "createProject",
    options: props => ({
      update: props.mutationUpdate,
    }),
  })
)(AddPreviousProjectModal);

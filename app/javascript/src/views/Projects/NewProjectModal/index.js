import React from "react";
import find from "lodash/find";
import { Formik } from "formik";
import { graphql, compose } from "react-apollo";
import Text from "../../../components/Text";
import Modal from "../../../components/Modal";
import Loading from "../../../components/Loading";
import FieldRow from "src/components/FieldRow";
import Heading from "../../../components/Heading";
import SuggestedSelect from "src/components/SuggestedSelect";
import { NewProjectChoice } from "./styles";
import fetchSkills from "./skills.graphql";
import createProject from "./createProject.graphql";
import fetchProjects from '../projects.graphql';

const getSelectedOption = (skills, id) => {
  if (!id) return null;
  return find(skills, { value: id });
};

const openCalendly = () => {
  Calendly.showPopupWidget(
    "https://calendly.com/advisable-marketing/briefing/"
  );
  return false;
};

const NewProjectModal = ({ isOpen, onClose, data, mutate }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="xl">
      <Heading marginBottom="xs" centered>
        Create a new project
      </Heading>
      <Text marginBottom="l">What skill are you looking for?</Text>
      <Formik
        initialValues={{
          primarySkill: "",
          serviceType: ""
        }}
        onSubmit={async values => {
          const response = await mutate({
            variables: { input: values }
          });

          const { project } = response.data.createProject;
          if (project.serviceType === "Assisted") {
            openCalendly();
            onClose();
            return
          }

          window.location = `/project_setup/${project.airtableId}/company_overview`
        }}
        render={formik => {
          if (formik.isSubmitting) {
            return <Loading />
          }

          return (
            <form onSubmit={formik.handleSubmit}>
              <FieldRow>
                <SuggestedSelect
                  name="skills"
                  options={data.skills}
                  value={getSelectedOption(
                    data.skills,
                    formik.values.primarySkill
                  )}
                  onBlur={formik.handleBlur}
                  onChange={skill =>
                    formik.setFieldValue("primarySkill", skill)
                  }
                />
              </FieldRow>

              {formik.values.primarySkill && (
                <React.Fragment>
                  <Text marginBottom="s">How would you like to proceed?</Text>
                  <NewProjectChoice
                    onClick={() => {
                      formik.setFieldValue("serviceType", "Assisted");
                      formik.submitForm();
                    }}
                  >
                    <h4>Request a call back</h4>
                    <p>
                      Have an Advisable team member setup your project with you
                      making sure you don’t miss anything!
                    </p>
                    <svg className="Arrow" width={7} height={11} fill="none">
                      <path d="M.778 10.5l5-5-5-5" stroke="#8F96AE" />
                    </svg>
                  </NewProjectChoice>
                  <NewProjectChoice
                    onClick={() => {
                      formik.setFieldValue("serviceType", "Self-Service");
                      formik.submitForm();
                    }}
                  >
                    <h4>Self-Service</h4>
                    <p>
                      Setup the project yourself without speaking to a member of
                      the Advisable team.
                    </p>
                    <svg className="Arrow" width={7} height={11} fill="none">
                      <path d="M.778 10.5l5-5-5-5" stroke="#8F96AE" />
                    </svg>
                  </NewProjectChoice>
                </React.Fragment>
              )}
            </form>
          );
        }}
      />
    </Modal>
  );
};

export default compose(
  graphql(fetchSkills),
  graphql(createProject, {
    options: props => ({
      refetchQueries: [{
        query: fetchProjects,
      }]
    })
  })
)(NewProjectModal);

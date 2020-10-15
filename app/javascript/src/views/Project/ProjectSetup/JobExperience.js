import React from "react";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { setupProgress } from "./SetupSteps";

export default function JobExperience({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  if (!setupProgress(data.project).primarySkill) {
    return <Redirect to={`/projects/${id}/setup/primary_skill`} />;
  }

  const initialValues = {
    industryExperienceImportance: data.project.industryExperienceImportance,
  };

  const handleSubmit = (values) => {
    updateProject({
      variables: {
        input: {
          id,
          industryExperienceImportance: Number(
            values.industryExperienceImportance,
          ),
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateProject: {
          __typename: "UpdateProjectPayload",
          project: {
            ...data.project,
            industryExperienceImportance: values.industryExperienceImportance,
          },
        },
      },
    });

    if (location.state?.readyToPublish) {
      history.push(`/projects/${id}/setup/publish`);
    } else {
      history.push(`/projects/${id}/setup/location`);
    }
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("industryExperienceImportance", val);
    formik.submitForm();
  };

  const { user } = data.project;
  const industry = user.industry.name;
  const companyType = user.companyType;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            {t("jobSetup.experience.title", { industry, companyType })}
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="xl">
            If this is important, we&apos;ll only match you with specialists
            who&apos;ve worked with similar companies before.
          </JobSetupStepSubHeader>
          <Field
            name="industryExperienceImportance"
            as={RangeSelection}
            onChange={handleSelection(formik)}
          />
        </Form>
      )}
    </Formik>
  );
}

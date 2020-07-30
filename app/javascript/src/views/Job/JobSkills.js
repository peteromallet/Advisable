import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, Field } from "formik";
import { Box, Text, Autocomplete, Error } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import PopularSkills from "./PopularSkills";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobSkills({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    test: "",
    skills: data.project.skills.map((s) => s.name),
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          skills: values.skills,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to save skills, please try again.");
    } else {
      if (values.skills.length > 1) {
        history.push({ ...location, pathname: `/jobs/${id}/primary_skill` });
      } else {
        history.push({ ...location, pathname: `/jobs/${id}/experience` });
      }
    }
  };

  const skillOptions = React.useMemo(() => {
    return data.skills.map((skill) => ({
      label: skill.name,
      value: skill.name,
    }));
  }, [data.skills]);

  const user = data.project.user;
  const industrySkils = user.industry?.popularSkills.nodes;
  const popularSkills = industrySkils || data.popularSkills.nodes;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            What skills should this specialist have?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            This is to help us know which specialists to invite to this project.
          </JobSetupStepSubHeader>
          <Field
            max={5}
            multiple
            name="skills"
            marginBottom="xl"
            as={Autocomplete}
            options={skillOptions}
            placeholder="e.g Facebook Advertising"
            onChange={(skills) => formik.setFieldValue("skills", skills)}
          />
          <Box mb="l">
            <PopularSkills
              skills={popularSkills}
              industry={user.industry?.name}
              companyType={user.companyType}
              disabled={formik.values.skills.length >= 5}
            />
          </Box>
          <SubmitButton
            size="l"
            disabled={formik.values.skills.length === 0}
            suffix={<ArrowRight />}
          >
            Continue
          </SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}

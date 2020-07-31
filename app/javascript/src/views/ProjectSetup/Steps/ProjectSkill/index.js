import React from "react";
import { Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Box, Autocomplete, Select, Button } from "@advisable/donut";
import FormField from "src/components/FormField";
import Loading from "src/components/Loading";
import SKILLS from "./skills.js";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function ProjectSkillsStep({ project }) {
  const params = useParams();
  const history = useHistory();
  const query = useQuery(SKILLS);
  const [mutate] = useMutation(UPDATE_PROJECT);

  if (query.loading) return <Loading />;

  let initialValues = {
    skills: project.skills.map((skill) => skill.name),
    primarySkill: project.primarySkill?.name || "",
  };

  if (project) {
    initialValues.id = project.airtableId;
    initialValues.primarySkill = project.primarySkill?.name || "";
  }

  const handleSubmit = async (values) => {
    await mutate({
      variables: { input: values },
    });

    const id = params.projectID;
    history.push(`/project_setup/${id}/company_overview`);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ values, ...formik }) => (
        <form onSubmit={formik.handleSubmit}>
          <Box mb="xl">
            <FormField
              max={5}
              multiple
              name="skills"
              as={Autocomplete}
              options={query.data.skills}
              placeholder="Search for a skill"
              label="Select the primary skill you require from a freelancer in the list below."
              onChange={(skills) => {
                if (skills.indexOf(values.primarySkill) === -1) {
                  formik.setFieldValue("primarySkill", skills[0]);
                }
                formik.setFieldValue("skills", skills);
              }}
            />
          </Box>
          {values.skills.length > 1 && (
            <Box mb="xl">
              <FormField
                as={Select}
                name="primarySkill"
                label="Which of these is the primary skill for this project?"
              >
                {values.skills.map((skill) => (
                  <option key={skill}>{skill}</option>
                ))}
              </FormField>
            </Box>
          )}
          <Button size="l" type="submit" loading={formik.isSubmitting}>
            Continue
          </Button>
        </form>
      )}
    </Formik>
  );
}

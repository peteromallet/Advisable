import React from "react";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Text,
  Select,
  Label,
  Input,
  Stack,
  Autocomplete,
  RoundedButton,
  Textarea,
} from "@advisable/donut";
import Helper from "./Helper";
import { useUpdatePreviousProject } from "./queries";

const SKILLS = gql`
  {
    skills(local: true) {
      id
      label: name
      value: name
    }
  }
`;

const GOALS = [
  "Generate Leads",
  "Launch product",
  "Rebrand/reposition",
  "Increase brand awareness",
  "Improve conversion",
  "Improve retention",
  "Increase web traffic",
  "Other",
];

export default function Overview({ modal, data }) {
  const history = useHistory();
  const skillsQuery = useQuery(SKILLS);
  const [updatePreviousProject] = useUpdatePreviousProject();
  const [customGoal, setCustomGoal] = React.useState(
    GOALS.indexOf(data.previousProject.goal) === -1,
  );

  const handleSubmit = async (values) => {
    const response = await updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    const id = response.data.updatePreviousProject.previousProject.id;
    history.push(`${modal.returnPath}/previous_projects/${id}/portfolio`);
  };

  const initialValues = {
    description: data.previousProject.description || "",
    goal: data.previousProject.goal || "",
    skills: data.previousProject.skills.map((s) => s.name),
    primarySkill: data.previousProject.primarySkill?.name || "",
  };

  const handleGoalChange = (formik) => (e) => {
    if (e.target.value === "Other") {
      setCustomGoal(true);
      formik.setFieldValue("goal", "");
    } else {
      setCustomGoal(false);
      formik.handleChange(e);
    }
  };

  if (skillsQuery.loading) return <div>Loading...</div>;

  return (
    <Box display="flex">
      <Box flexGrow={1} pr="xl">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Text
                mb="xs"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
              >
                Project Overview
              </Text>
              <Text lineHeight="m" color="neutral700" mb="l">
                Previous projects are one of the most effective ways to validate
                your skills. Advisable uses them to decide what projects to
                invite you to.
              </Text>
              <Stack divider="neutral100" spacing="xxl" mb="xl">
                <Box>
                  <Label mb="xs" lineHeight="s">
                    Please describe the problem they had, an overview of the
                    project, how you approached it and the results you achieved
                  </Label>
                  <Field
                    as={Textarea}
                    placeholder="Project description"
                    name="description"
                  />
                </Box>
                <Box>
                  <Label mb="xs">
                    What skills did you use for this project?
                  </Label>
                  <Autocomplete
                    max={5}
                    multiple
                    name="skills"
                    options={skillsQuery.data.skills}
                    placeholder="Search for an industry"
                    value={formik.values.skills}
                    onChange={(skills) =>
                      formik.setFieldValue("skills", skills)
                    }
                    primary={formik.values.primarySkill}
                    onPrimaryChange={(skill) =>
                      formik.setFieldValue("primarySkill", skill)
                    }
                    description={
                      formik.values.primarySkill && (
                        <>
                          You have selected{" "}
                          <Text
                            as="span"
                            fontSize="xs"
                            color="neutral800"
                            fontWeight="medium"
                          >
                            {formik.values.primarySkill}
                          </Text>{" "}
                          as the primary skill.
                        </>
                      )
                    }
                  />
                </Box>
                <Box>
                  <Label mb="xs">
                    What was your primary goal for this project?
                  </Label>
                  <Field
                    name="goal"
                    as={Select}
                    onChange={handleGoalChange(formik)}
                    value={customGoal ? "Other" : formik.values.goal}
                  >
                    {GOALS.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </Field>
                  {customGoal && (
                    <Field
                      as={Input}
                      mt="xs"
                      name="goal"
                      placeholder="What was your goal for this project..."
                    />
                  )}
                </Box>
              </Stack>

              <RoundedButton
                size="l"
                type="submit"
                loading={formik.isSubmitting}
              >
                Continue
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Box width={320} flexShrink={0}>
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            The Advisable team will review and score the information you upload
            here in order to decide whether to propose you to clients.
          </Helper.Text>
          <Helper.Text heading="Who will see this?">
            This will be seen by potential clients when applying for projects on
            Advisable. Please provide as specific information as possible about
            the results of this project. Include URLs and examples of work where
            possible.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

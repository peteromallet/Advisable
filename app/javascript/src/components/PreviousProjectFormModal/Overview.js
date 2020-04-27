import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Text,
  Label,
  Input,
  Stack,
  Icon,
  Link,
  Select,
  Checkbox,
  InputError,
  Autocomplete,
  Button,
  Textarea,
} from "@advisable/donut";
import Helper from "./Helper";
import { useUpdatePreviousProject } from "./queries";
import { projectOverviewValidationSchema } from "./validationSchemas";
import FormField from "../../components/FormField";
import useLocationStages from "../../hooks/useLocationStages";

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

export default function Overview({ modal, data, skills }) {
  const { navigate, pathWithState } = useLocationStages();
  const [updatePreviousProject] = useUpdatePreviousProject();
  const [customGoal, setCustomGoal] = React.useState(
    GOALS.indexOf(data.previousProject.goal || GOALS[0]) === -1,
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
    navigate(`${modal.returnPath}/previous_projects/${id}/portfolio`);
  };

  const initialValues = {
    description: data.previousProject.description || "",
    goal: data.previousProject.goal || GOALS[0],
    skills: data.previousProject.skills.map((s) => s.name),
    primarySkill: data.previousProject.primarySkill?.name || "",
    publicUse: data.previousProject.publicUse || true,
  };

  const handleGoalChange = (formik) => (e) => {
    if (e.target.value === "Other") {
      setCustomGoal(true);
      formik.setFieldTouched("goal", false);
      formik.setFieldValue("goal", "");
    } else {
      setCustomGoal(false);
      formik.handleChange(e);
    }
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={projectOverviewValidationSchema}
        >
          {(formik) => (
            <Form>
              <Link
                mb="s"
                fontSize="l"
                fontWeight="medium"
                to={pathWithState(
                  `${modal.returnPath}/previous_projects/${data.previousProject.id}/client`,
                )}
              >
                <Icon icon="arrow-left" mr="xxs" width={20} />
                Back
              </Link>
              <Text
                mb="xs"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
              >
                Project Overview
              </Text>
              <Text lineHeight="l" color="neutral600" mb="xl">
                Tell us a little more about your involvement in this project.
                Please provide as specific information as possible about the
                results of this project.
              </Text>
              <Stack spacing="l" mb="xl">
                <Box>
                  <Label mb="xxs" lineHeight="s" htmlFor="description">
                    Project description
                  </Label>
                  <Text fontSize="s" color="neutral700" lineHeight="s" mb="s">
                    Please describe the problem they had, an overview of the
                    project, how you approached it and the results you achieved
                  </Text>
                  <Field
                    as={Textarea}
                    minRows={4}
                    id="description"
                    placeholder="Project description"
                    name="description"
                    error={
                      formik.touched.description && formik.errors.description
                    }
                  />
                  <ErrorMessage
                    mt="xs"
                    name="description"
                    component={InputError}
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
                    options={skills}
                    placeholder="Search for a skill"
                    value={formik.values.skills}
                    onChange={(skills) => {
                      const { primarySkill } = formik.values;
                      const selected = formik.values.skills;
                      if (selected.indexOf(primarySkill) === -1) {
                        formik.setFieldValue("primarySkill", skills[0]);
                      }
                      formik.setFieldValue("skills", skills);
                    }}
                  />
                  <ErrorMessage mt="xs" name="skills" component={InputError} />
                </Box>
                {formik.values.skills.length > 1 && (
                  <Box>
                    <Label mb="xs">
                      Which of these was the primary skill for this project?
                    </Label>
                    <Field name="primarySkill" as={Select}>
                      {formik.values.skills.map((skill) => (
                        <option key={skill}>{skill}</option>
                      ))}
                    </Field>
                  </Box>
                )}
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
                      error={formik.touched.goal && formik.errors.goal}
                      placeholder="What was your goal for this project..."
                    />
                  )}
                  <ErrorMessage mt="xs" name="goal" component={InputError} />
                </Box>
                <FormField as={Checkbox} type="checkbox" name="publicUse">
                  It is okay for Advisable to use anonymised details of this
                  project publicly to promote me
                </FormField>
              </Stack>

              <Button
                size="l"
                type="submit"
                loading={formik.isSubmitting}
                suffix={<Icon icon="arrow-right" />}
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            The Advisable team will review and score the information you provide
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

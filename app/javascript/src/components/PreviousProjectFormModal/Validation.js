import React from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Label,
  Select,
  RoundedButton,
} from "@advisable/donut";
import Helper from "./Helper";
import { useUpdatePreviousProject } from "./queries";

const RELATIONSHIPS = [
  "They managed the project",
  "They worked on the project with me",
  "They worked at the company but not the project",
];

export default function Validation({ data, modal }) {
  const history = useHistory();
  const [updatePreviousProject] = useUpdatePreviousProject();

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
    history.push(`${modal.returnPath}/previous_projects/${id}/more`);
  };

  const initialValues = {
    contactName: data.previousProject.contactName || "",
    contactJobTitle: data.previousProject.contactJobTitle || "",
    contactRelationship: data.previousProject.contactRelationship || "",
  };

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
                Validation
              </Text>
              <Text lineHeight="m" color="neutral700" mb="l">
                We will need to confirm the details of this project with someone
                who worked on the project.
              </Text>
              <Box display="flex" mb="l">
                <Box pr="xs" width="50%">
                  <Label mb="xs">Contact Name</Label>
                  <Field
                    as={Input}
                    name="contactName"
                    placeholder="Contact Name"
                  />
                </Box>
                <Box pl="xs" width="50%">
                  <Label mb="xs">Contact Job Title</Label>
                  <Field
                    as={Input}
                    name="contactJobTitle"
                    placeholder="Contact Job Title"
                  />
                </Box>
              </Box>
              <Label mb="xs">
                What was your relationship to them for this project?
              </Label>
              <Field as={Select} name="contactRelationship" mb="xl">
                {RELATIONSHIPS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Field>

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
            With your permission, Advisable will reach out to this contact to
            validate your performance on this project.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

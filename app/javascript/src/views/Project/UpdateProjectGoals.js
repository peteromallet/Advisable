import { Formik, Form, Field } from "formik";
import ActionBarModal from "./ActionBarModal";
import SubmitButton from "components/SubmitButton";
import BulletPointInput from "components/BulletPointInput";
import { Text, Stack } from "@advisable/donut";
import { useUpdateProject } from "./queries";

export default function UpdateProjectGoalsModal({ dialog, project }) {
  const [updateProject] = useUpdateProject();

  const initialValues = {
    goals: project.goals,
  };

  const handleSubmit = async (values) => {
    await updateProject({
      variables: {
        input: {
          id: project.id,
          ...values,
        },
      },
    });

    dialog.hide();
  };

  return (
    <ActionBarModal width={700} dialog={dialog}>
      {dialog.visible && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Text
                fontSize="3xl"
                marginBottom="xl"
                fontWeight="medium"
                letterSpacing="-0.02em"
              >
                Briefly describe your goals for this project
              </Text>
              <Stack spacing="xl" marginBottom="xl">
                <Field
                  as={BulletPointInput}
                  name="goals"
                  placeholder={project.primarySkill?.goalPlaceholder || "Goal"}
                  onChange={(v) => formik.setFieldValue("goals", v)}
                />
              </Stack>
              <SubmitButton variant="dark">Save Changes</SubmitButton>
            </Form>
          )}
        </Formik>
      )}
    </ActionBarModal>
  );
}

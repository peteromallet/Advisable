import { useState } from "react";
import { Formik, Form, Field } from "formik";
import ActionBarModal from "./ActionBarModal";
import SubmitButton from "components/SubmitButton";
import BulletPointInput from "components/BulletPointInput";
import { Text, Stack, Box } from "@advisable/donut";
import { useUpdateProject } from "./queries";
import RequiredCharacteristic from "./ProjectSetup/RequiredCharacteristic";

const CHARACTERISTICS = "CHARACTERISTICS";
const REQUIRED_CHARACTERISTICS = "REQUIRED_CHARACTERISTICS";

export default function UpdateProjectRequirementsModal({ dialog, project }) {
  const [step, setStep] = useState(CHARACTERISTICS);
  const [updateProject] = useUpdateProject();

  const initialValues = {
    characteristics: project.characteristics,
    requiredCharacteristics: project.requiredCharacteristics,
  };

  const handleSubmit = async (values) => {
    if (step === CHARACTERISTICS) {
      setStep(REQUIRED_CHARACTERISTICS);
    } else {
      await updateProject({
        variables: {
          input: {
            id: project.id,
            ...values,
          },
        },
      });

      setStep(CHARACTERISTICS);
      dialog.hide();
    }
  };

  return (
    <ActionBarModal width={700} dialog={dialog}>
      {dialog.visible && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              {step === CHARACTERISTICS && (
                <>
                  <Text
                    fontSize="3xl"
                    marginBottom="xl"
                    fontWeight="medium"
                    letterSpacing="-0.02em"
                  >
                    What characteristics should this specialist have?
                  </Text>
                  <Stack spacing="xl" marginBottom="xl">
                    <Field
                      as={BulletPointInput}
                      name="characteristics"
                      placeholder={
                        project.primarySkill?.characteristicPlaceholder ||
                        "e.g Strong communication skills"
                      }
                      label="What characteristics should this specialist have?"
                      description="We'll check this list against every specialist we match you with."
                      onChange={(v) =>
                        formik.setFieldValue("characteristics", v)
                      }
                    />
                  </Stack>
                  <SubmitButton variant="dark">Next</SubmitButton>
                </>
              )}

              {step === REQUIRED_CHARACTERISTICS && (
                <>
                  <Text
                    fontSize="3xl"
                    marginBottom="xl"
                    fontWeight="medium"
                    letterSpacing="-0.02em"
                  >
                    Which of these characteristics are essential?
                  </Text>
                  <Box marginBottom="xl">
                    {formik.values.characteristics.map((characteristic, i) => (
                      <Field
                        key={i}
                        type="checkbox"
                        value={characteristic}
                        as={RequiredCharacteristic}
                        name="requiredCharacteristics"
                      >
                        {characteristic}
                      </Field>
                    ))}
                  </Box>
                  <SubmitButton>Save Changes</SubmitButton>
                </>
              )}
            </Form>
          )}
        </Formik>
      )}
    </ActionBarModal>
  );
}

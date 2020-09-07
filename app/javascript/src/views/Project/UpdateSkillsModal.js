import React from "react";
import { Formik, Form } from "formik";
import ActionBarModal from "./ActionBarModal";
import Loading from "components/Loading";
import FormField from "components/FormField";
import { useTranslation } from "react-i18next";
import TilesInput from "components/TilesInput";
import SubmitButton from "components/SubmitButton";
import { Text, Autocomplete, Select, Stack } from "@advisable/donut";
import { useSkills, useUpdateProject } from "./queries";

export default function UpdateSkillsModal({ dialog, project }) {
  const { t } = useTranslation();
  const [updateProject] = useUpdateProject();
  const { data, loading, errors } = useSkills();

  const industry = project.user.industry.name;
  const companyType = project.user.companyType;

  const initialValues = {
    industryExperienceImportance: project.industryExperienceImportance,
    primarySkill: project.primarySkill?.name,
    skills: project.skills.map((s) => s.name),
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
      <Text
        fontSize="3xl"
        marginBottom="xl"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Project Skills
      </Text>
      {loading ? (
        <Loading />
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Stack spacing="xl" marginBottom="xl">
                <FormField
                  max={5}
                  multiple
                  name="skills"
                  as={Autocomplete}
                  options={data.skills.map((s) => ({
                    value: s.name,
                    label: s.name,
                  }))}
                  label="What skills should this specialist have?"
                  placeholder="e.g Facebook Advertising"
                  description="This is to help us know which specialists to invite to this project."
                  onChange={(skills) => formik.setFieldValue("skills", skills)}
                />
                {formik.values.skills.length > 1 && (
                  <FormField
                    name="primarySkill"
                    label="Which of these is the most important?"
                    description="We'll make sure each of the specialists we match you with have a
                    proven track record in this skill."
                    as={Select}
                  >
                    {formik.values.skills.map((skill) => (
                      <option key={skill}>{skill}</option>
                    ))}
                  </FormField>
                )}
                <FormField
                  as={TilesInput}
                  name="industryExperienceImportance"
                  label={t("jobSetup.experience.title", {
                    industry,
                    companyType,
                  })}
                  onChange={(n) =>
                    formik.setFieldValue("industryExperienceImportance", n)
                  }
                  options={[
                    { label: "Not Important", value: 0 },
                    { label: "Not Sure", value: 1 },
                    { label: "Important", value: 2 },
                  ]}
                />
              </Stack>
              <SubmitButton>Save Changes</SubmitButton>
            </Form>
          )}
        </Formik>
      )}
    </ActionBarModal>
  );
}

import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import {
  Box,
  Text,
  Checkbox,
  NumberedList,
  Radio,
  Card,
} from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import CurrencyInput from "src/components/CurrencyInput";
import { projectTypeValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.js";
import { useHistory } from "react-router";

const ProjectType = ({ application }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async (values) => {
    const { errors } = await updateApplication({
      variables: {
        input: {
          id: application.id,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit
            ? Number(values.monthlyLimit)
            : undefined,
        },
      },
    });

    if (!errors) {
      const urlPrefix = `/applications/${application.id}/proposal`;
      history.push(`${urlPrefix}/tasks`);
    }
  };

  const initialValues = {
    projectType: application.projectType || "",
    monthlyLimit: application.monthlyLimit || "",
    accept: false,
  };

  return (
    <Card borderRadius="12px" padding={8}>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={projectTypeValidationSchema}
      >
        {(formik) => (
          <Form>
            <Text
              as="h2"
              fontSize="4xl"
              marginBottom={2}
              fontWeight="medium"
              letterSpacing="-0.03rem"
            >
              Project Type
            </Text>
            <Text marginBottom={6}>
              How do you think it makes sense to work with{" "}
              {application.project.user.companyName}?
            </Text>
            <Box paddingBottom="m">
              <Field
                as={Radio}
                type="radio"
                name="projectType"
                value="Fixed"
                data-testid="fixed"
                onChange={(e) => {
                  formik.setFieldValue("accept", false);
                  formik.handleChange(e);
                }}
                label={t("projectTypes.Fixed.label")}
                description={t("projectTypes.Fixed.proposalDescription")}
              />
            </Box>
            <Box paddingBottom="xl">
              <Field
                as={Radio}
                type="radio"
                name="projectType"
                value="Flexible"
                data-testid="flexible"
                onChange={(e) => {
                  formik.setFieldValue("accept", false);
                  formik.handleChange(e);
                }}
                label={t("projectTypes.Flexible.label")}
                description={t("projectTypes.Flexible.proposalDescription")}
              />
            </Box>
            {formik.values.projectType === "Flexible" && (
              <>
                <Box mb="l" height={1} bg="neutral100" />
                <FormField
                  autoFocus
                  prefix="Hours"
                  as={CurrencyInput}
                  name="monthlyLimit"
                  placeholder="Monthly limit"
                  label="Set suggested monthly hour cap (to 200-hour max)"
                />
              </>
            )}
            {formik.values.projectType === "Fixed" && (
              <>
                <Box mb="l" height={1} bg="neutral100" />
                <Text mb="m" fontSize="s">
                  In order to guarantee payment, the following terms must be
                  followed:
                </Text>
                <NumberedList mb="l">
                  <NumberedList.Item>
                    I will only start working when a project has been assigned
                    to me by a client.
                  </NumberedList.Item>
                  <NumberedList.Item>
                    As soon as I start working, I will mark the project as
                    &quot;working&quot; to ensure accurate tracking.
                  </NumberedList.Item>
                  <NumberedList.Item>
                    Upon completion, I will mark a project as “submitted” in
                    order for my payment to be approved.
                  </NumberedList.Item>
                </NumberedList>
                <Field as={Checkbox} type="checkbox" name="accept">
                  I agree to follow these payment terms
                </Field>
                <Box my="l" height={1} bg="neutral100" />
              </>
            )}

            {formik.values.projectType === "Flexible" && (
              <>
                <Box my="l" height={1} bg="neutral100" />
                <Text mb="m" fontSize="s">
                  In order to guarantee payment, the following terms must be
                  followed:
                </Text>
                <NumberedList mb="l">
                  <NumberedList.Item>
                    I will submit my hours for approval on a weekly basis
                  </NumberedList.Item>
                </NumberedList>
                <Field as={Checkbox} type="checkbox" name="accept">
                  I agree to follow these payment terms
                </Field>
                <Box my="l" height={1} bg="neutral100" />
              </>
            )}
            <SubmitButton disableUntilValid aria-label="Continue">
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ProjectType;

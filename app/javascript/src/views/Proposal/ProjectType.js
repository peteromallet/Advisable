import * as React from "react";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import {
  Card,
  Box,
  Icon,
  Text,
  Checkbox,
  NumberedList,
  RoundedButton,
} from "@advisable/donut";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import TextField from "../../components/TextField";
import Radio from "../../components/Radio";
import { projectTypeValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.js";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const BookingType = ({ history, application }) => {
  const { t } = useTranslation();
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async values => {
    const response = await updateApplication({
      variables: {
        input: {
          id: application.airtableId,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit,
        },
      },
    });

    const { errors } = response.data.updateApplication;

    if (!errors) {
      const urlPrefix = `/applications/${application.airtableId}/proposal`;
      const { projectType } = response.data.updateApplication.application;

      if (projectType === "Fixed") {
        history.push(`${urlPrefix}/tasks`);
      } else {
        history.push(`${urlPrefix}/billing_cycle`);
      }
    }
  };

  const initialValues = {
    projectType: application.projectType || "",
    monthlyLimit: application.monthlyLimit || undefined,
    accept: false,
  };

  const handleLimitChange = formik => e => {
    let value = e.target.value;
    if (value) {
      value = value.replace(" hours", "");
      value = value.replace(/\,/g, "");
      value = Number(value);
    } else {
      value = undefined;
    }
    formik.setFieldTouched("monthlyLimit", true);
    formik.setFieldValue("monthlyLimit", value);
  };

  return (
    <Card padding="l">
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={projectTypeValidationSchema}
      >
        {formik => (
          <Form>
            <Text
              as="h3"
              mb="xs"
              fontSize="xl"
              color="blue.9"
              fontWeight="semibold"
            >
              Booking Type
            </Text>
            <Text mb="l" color="neutral.8" lineHeight="m">
              How would you like to work with{" "}
              {application.project.user.companyName}?
            </Text>
            <Box marginBottom="m">
              <Field
                as={Radio}
                type="radio"
                name="projectType"
                value="Fixed"
                data-testid="fixed"
                onChange={e => {
                  formik.setFieldValue("accept", false);
                  formik.handleChange(e);
                }}
                label={t("projectTypes.Fixed.label")}
                description={t("projectTypes.Fixed.proposalDescription")}
              />
            </Box>
            <Box marginBottom="xl">
              <Field
                as={Radio}
                type="radio"
                name="projectType"
                value="Flexible"
                data-testid="flexible"
                onChange={e => {
                  formik.setFieldValue("accept", false);
                  formik.handleChange(e);
                }}
                label={t("projectTypes.Flexible.label")}
                description={t("projectTypes.Flexible.proposalDescription")}
              />
            </Box>
            {formik.values.projectType === "Flexible" && (
              <>
                <Box mb="l" height={1} bg="neutral.1" />
                <TextField
                  autoFocus
                  name="monthlyLimit"
                  mask={numberMask}
                  placeholder="Monthly limit"
                  label="Set suggested monthly hour cap (to 200-hour max)"
                  onChange={handleLimitChange(formik)}
                  value={formik.values.monthlyLimit}
                  error={
                    formik.touched.monthlyLimit && formik.errors.monthlyLimit
                  }
                />
              </>
            )}
            {formik.values.projectType === "Fixed" && (
              <>
                <Box mb="l" height={1} bg="neutral.1" />
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
                <Box my="l" height={1} bg="neutral.1" />
              </>
            )}

            {formik.values.projectType === "Flexible" && (
              <>
                <Box my="l" height={1} bg="neutral.1" />
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
                <Box my="l" height={1} bg="neutral.1" />
              </>
            )}
            <RoundedButton
              type="submit"
              aria-label="Continue"
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default BookingType;

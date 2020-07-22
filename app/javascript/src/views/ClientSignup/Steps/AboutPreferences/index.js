import React from "react";
import PropTypes from "prop-types";
import { string, object, number } from "yup";
import { Formik, Form } from "formik";
// Components
import SubmitButton from "../../../../components/SubmitButton";
import ScaleInput from "../../../../components/ScaleInput";
import ChoiceList from "../../../../components/ChoiceList";
import Loading from "../../../../components/Loading";
import FormField from "src/components/FormField";
import { Text, Stack } from "@advisable/donut";
// Queries
import {
  useAboutPreferencesSubmit,
  getAboutPreferencesOptimisticResponse,
  useLocationState,
  useClientApplicationQuery,
} from "../../queries";

const validationSchema = object().shape({
  localityImportance: number(),
  acceptedGuaranteeTerms: string(),
  talentQuality: string(),
});

const talentQualityOptions = [
  {
    label: "Cheap Talent - I don't care about quality",
    value: "CHEAP",
  },
  {
    label: "Budget Talent - I'm very cost-conscious",
    value: "BUDGET",
  },
  {
    label: "Good Talent - I want reliable talent",
    value: "GOOD",
  },
  {
    label: "Top Talent - I want talent I can fully trust",
    value: "TOP",
  },
  {
    label: "World Class - I want the best of the best",
    value: "WORLD_CLASS",
  },
];

function AboutPreferences({ RedirectToInitialStep, RedirectToNextStep }) {
  const locationState = useLocationState();
  const [submitClientApplication, { called }] = useAboutPreferencesSubmit();
  const { loading, error, data } = useClientApplicationQuery();

  if (loading) return <Loading />;
  if (error) return <RedirectToInitialStep />;
  if (called) return <RedirectToNextStep state={{ ...locationState }} />;
  const {
    localityImportance,
    talentQuality,
    numberOfFreelancers,
  } = data.clientApplication;

  // Formik
  const initialValues = {
    localityImportance: localityImportance || 0,
    acceptedGuaranteeTerms: "",
    talentQuality: talentQuality || "",
  };

  const handleSubmit = (values) => {
    values.acceptedGuaranteeTerms = values.acceptedGuaranteeTerms === "yes";
    submitClientApplication({
      variables: {
        id: locationState.applicationId,
        ...values,
      },
      optimisticResponse: getAboutPreferencesOptimisticResponse(
        locationState.applicationId,
        values,
        numberOfFreelancers,
      ),
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <>
          <Text
            as="h2"
            mb="m"
            color="blue.8"
            fontSize="xxxl"
            lineHeight="xxxl"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            About Your Preferences
          </Text>
          <Text mb="m">This is to help tailor our recommendations to you.</Text>
          <Form>
            <Stack spacing="l" mb="l">
              <FormField
                as={ScaleInput}
                name="localityImportance"
                label="How important is it that freelancers you hire are in the same city as you?"
                leftTitle="Not Important"
                rightTitle="Very Important"
                onChange={(n) => formik.setFieldValue("localityImportance", n)}
              />
              <ChoiceList
                fullWidth
                optionsPerRow={2}
                name="acceptedGuaranteeTerms"
                onChange={formik.handleChange}
                error={
                  formik.touched.talentQuality && formik.errors.talentQuality
                }
                label="In order to avail of our money-back guarantee, are you willing to provide feedback on every freelancer you hire?"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                value={formik.values.acceptedGuaranteeTerms}
              />
              <ChoiceList
                fullWidth
                optionsPerRow={1}
                name="talentQuality"
                onChange={formik.handleChange}
                error={
                  formik.touched.talentQuality && formik.errors.talentQuality
                }
                label="What level of talent are you typically looking for?"
                options={talentQualityOptions}
                value={formik.values.talentQuality}
              />
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

AboutPreferences.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
};

export default AboutPreferences;

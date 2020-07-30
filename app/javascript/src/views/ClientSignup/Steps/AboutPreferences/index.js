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
import { Box } from "@advisable/donut";
// Queries
import {
  useAboutPreferencesSubmit,
  getAboutPreferencesOptimisticResponse,
  useLocationState,
  useClientApplicationQuery,
} from "../../queries";
import Navigation from "../Navigation";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";

const validationSchema = object().shape({
  localityImportance: number().required(
    "Please enter your freelancer locality importance",
  ),
  acceptedGuaranteeTerms: string().required(
    "Please enter your feedback guarantee",
  ),
  talentQuality: string().required(
    "Please enter your required level of talent",
  ),
});

const talentQualityOptions = [
  {
    label: "Cheap Talent — I don't care about quality",
    value: "CHEAP",
  },
  {
    label: "Budget Talent — I'm very cost-conscious",
    value: "BUDGET",
  },
  {
    label: "Good Talent — I want reliable talent",
    value: "GOOD",
  },
  {
    label: "Top Talent — I want talent I can fully trust",
    value: "TOP",
  },
  {
    label: "World Class — I want the best of the best",
    value: "WORLD_CLASS",
  },
];

function AboutPreferences() {
  const locationState = useLocationState();
  const [submitClientApplication, { called }] = useAboutPreferencesSubmit();
  const { loading, error, data } = useClientApplicationQuery();

  if (loading) return <Loading />;
  const {
    localityImportance,
    talentQuality,
    numberOfFreelancers,
    status,
  } = data.clientApplication;

  // Formik
  const initialValues = {
    localityImportance: localityImportance || undefined,
    acceptedGuaranteeTerms: "",
    talentQuality: talentQuality || "",
  };

  const handleSubmit = (values) => {
    values.acceptedGuaranteeTerms = values.acceptedGuaranteeTerms === "yes";
    submitClientApplication({
      variables: {
        input: {
          id: locationState.applicationId,
          ...values,
        },
      },
      optimisticResponse: getAboutPreferencesOptimisticResponse(
        locationState.applicationId,
        values,
        numberOfFreelancers,
      ),
    });
  };

  return (
    <>
      <Navigation error={error} called={called} status={status} />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <MotionStack>
              <Title>About Your Preferences</Title>
              <Description>
                This is to help tailor our recommendations to you.
              </Description>
              <Box mb="xl">
                <FormField
                  isRequired
                  as={ScaleInput}
                  name="localityImportance"
                  label="How important is it that freelancers you hire should be in your city?"
                  leftTitle="Not Important"
                  rightTitle="Very Important"
                  onChange={(n) =>
                    formik.setFieldValue("localityImportance", n)
                  }
                />
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={ChoiceList}
                  fullWidth
                  error={null}
                  optionsPerRow={2}
                  name="acceptedGuaranteeTerms"
                  onChange={formik.handleChange}
                  label="In order to avail of our money-back guarantee, are you willing to provide feedback on every freelancer you hire?"
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                  value={formik.values.acceptedGuaranteeTerms}
                />
              </Box>
              <Box mb="m">
                <FormField
                  isRequired
                  as={ChoiceList}
                  fullWidth
                  optionsPerRow={1}
                  name="talentQuality"
                  onChange={formik.handleChange}
                  error={null}
                  label="What level of talent are you typically looking for?"
                  options={talentQualityOptions}
                  value={formik.values.talentQuality}
                />
              </Box>
              <SubmitButton width={[1, "auto"]}>Continue</SubmitButton>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}

AboutPreferences.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
  RedirectToLastStep: PropTypes.elementType,
};

export default AboutPreferences;

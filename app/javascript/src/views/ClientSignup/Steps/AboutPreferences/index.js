import React from "react";
import { string, object, number } from "yup";
import { Formik, Form } from "formik";
// Components
import SubmitButton from "../../../../components/SubmitButton";
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
import ProcessingApplication from "./ProcessingApplication";
import { motion } from "framer-motion";
import TilesInput from "../../TilesInput";
import {
  Meh,
  Sliders,
  Sunrise,
  Sun,
  Award,
  Check,
  X,
} from "@styled-icons/feather";

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
    label: "Cheap Talent",
    value: "CHEAP",
    comment: "I don't care about quality",
    icon: Meh,
  },
  {
    label: "Budget Talent",
    value: "BUDGET",
    comment: "I'm very cost-conscious",
    icon: Sliders,
  },
  {
    label: "Good Talent",
    value: "GOOD",
    comment: "I want reliable talent",
    icon: Sunrise,
  },
  {
    label: "Top Talent",
    value: "TOP",
    comment: "I want talent I can fully trust",
    icon: Sun,
  },
  {
    label: "World Class",
    value: "WORLD_CLASS",
    comment: "I want the best of the best",
    icon: Award,
  },
];

function AboutPreferences() {
  const locationState = useLocationState();
  const [
    submitClientApplication,
    { called, data: processing },
  ] = useAboutPreferencesSubmit();
  const { loading, error, data } = useClientApplicationQuery();

  if (loading || error)
    return (
      <motion.div exit>
        <Navigation error={error} />
        <Loading />
      </motion.div>
    );

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
    const convertedValues = {
      ...values,
      acceptedGuaranteeTerms: values.acceptedGuaranteeTerms === "yes",
      localityImportance: Number(values.localityImportance),
    };
    submitClientApplication({
      variables: {
        input: {
          id: locationState.applicationId,
          ...convertedValues,
        },
      },
      optimisticResponse: getAboutPreferencesOptimisticResponse(
        locationState.applicationId,
        convertedValues,
        numberOfFreelancers,
      ),
    });
  };

  return (
    <>
      <Navigation called={called} status={status} delay={called ? 5000 : 0} />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <MotionStack position="relative">
              {called && <ProcessingApplication />}
              <Title>About Your Preferences</Title>
              <Description>
                This is to help tailor our recommendations to you.
              </Description>
              <Box mb="l">
                <FormField
                  isRequired
                  as={TilesInput}
                  fullWidth
                  optionsPerRow={1}
                  name="localityImportance"
                  onChange={(n) =>
                    formik.setFieldValue("localityImportance", n)
                  }
                  error={null}
                  label="How important is it that freelancers you hire should be in your city?"
                  options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                  ]}
                  value={formik.values.localityImportance}
                />
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={TilesInput}
                  fullWidth
                  optionsPerRow={1}
                  name="acceptedGuaranteeTerms"
                  onChange={(v) =>
                    formik.setFieldValue("acceptedGuaranteeTerms", v)
                  }
                  error={null}
                  label="In order to avail of our money-back guarantee, are you willing to provide feedback on every freelancer you hire?"
                  options={[
                    { label: "Yes", value: "yes", icon: Check },
                    { label: "No", value: "no", icon: X },
                  ]}
                  value={formik.values.acceptedGuaranteeTerms}
                />
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={TilesInput}
                  fullWidth
                  optionsPerRow={1}
                  name="talentQuality"
                  onChange={(v) => formik.setFieldValue("talentQuality", v)}
                  error={null}
                  label="What level of talent are you typically looking for?"
                  options={talentQualityOptions}
                  value={formik.values.talentQuality}
                />
              </Box>
              <SubmitButton width={[1, "auto"]} loading={called && !processing}>
                Continue
              </SubmitButton>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AboutPreferences;

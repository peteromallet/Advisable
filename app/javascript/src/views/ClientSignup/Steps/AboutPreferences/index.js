import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../../../../components/SubmitButton";
import ScaleInput from "../../../../components/ScaleInput";
import { Text, Box, Stack, Label, Radio, RadioGroup } from "@advisable/donut";
import FormField from "src/components/FormField";
import { string, object, number } from "yup";
import {
  useAboutPreferencesSubmit,
  useAboutPreferencesQuery,
  getAboutPreferencesOptimisticResponse,
  useApplicationId,
} from "../../queries";
import Loading from "../../../../components/Loading";

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

function AboutPreferences({ pushNextStepPath, pushInitialStepPath }) {
  const applicationId = useApplicationId();
  const [submitClientApplication] = useAboutPreferencesSubmit();
  const { loading, error, data } = useAboutPreferencesQuery();

  if (error) pushInitialStepPath();
  if (loading) return <Loading />;

  console.log("about preferences data", data);
  // Formik
  const initialValues = {
    localityImportance: data.clientApplication.localityImportance || 0,
    acceptedGuaranteeTerms: "",
    talentQuality: data.clientApplication.talentQuality || "",
  };

  const handleSubmit = (values) => {
    values.acceptedGuaranteeTerms = values.acceptedGuaranteeTerms === "yes";
    submitClientApplication({
      variables: {
        id: applicationId,
        ...values,
      },
      optimisticResponse: getAboutPreferencesOptimisticResponse(
        applicationId,
        values,
        data.clientApplication.numberOfFreelancers,
      ),
      update: () => pushNextStepPath({ state: { applicationId } }),
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
            <Stack spacing="m" mb="l">
              <FormField
                as={ScaleInput}
                name="localityImportance"
                label="How important is it that freelancers you hire are in the same city as you?"
                leftTitle="Not Important"
                rightTitle="Very Important"
                onChange={(n) => formik.setFieldValue("localityImportance", n)}
              />
              <RadioGroup mb="xs">
                <Label mb="xs">
                  In order to avail of our money-back guarantee, are you willing
                  to provide feedback on every freelancer you hire?
                </Label>
                <Box display="flex">
                  <FormField
                    as={Radio}
                    type="radio"
                    // label="yes"
                    value="yes"
                    name="acceptedGuaranteeTerms"
                    variation="bordered"
                    data-testid="yes"
                    description="Yes"
                  />
                  <FormField
                    as={Radio}
                    type="radio"
                    // label="no"
                    value="no"
                    name="acceptedGuaranteeTerms"
                    variation="bordered"
                    data-testid="no"
                    description="No"
                  />
                </Box>
              </RadioGroup>
              <RadioGroup mb="l">
                <Label mb="xs">
                  What level of talent are you typically looking for?
                </Label>
                <>
                  {talentQualityOptions.map((quality, index) => (
                    <Box
                      key={`talent-quality-option-${index}`}
                      display="flex"
                      flexDirection="row-reverse"
                      justifyContent="flex-end"
                    >
                      <FormField
                        as={Radio}
                        type="radio"
                        value={quality.value}
                        name="talentQuality"
                        description={quality.label}
                      />
                    </Box>
                  ))}
                </>
              </RadioGroup>
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

AboutPreferences.propTypes = {
  pushNextStepPath: PropTypes.func,
  pushInitialStepPath: PropTypes.func,
};

export default AboutPreferences;

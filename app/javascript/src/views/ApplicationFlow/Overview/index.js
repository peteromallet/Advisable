import * as React from "react";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Box, Text, Checkbox, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { ChoiceList } from "src/components";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import {
  updateApplication as UPDATE_APPLICATION,
  updateProfile as UPDATE_PROFILE,
} from "../queries";
import validationSchema from "./validationSchema";
import StepCard from "../StepCard";
import { StyledIntroduction, StyledPersistBio } from "./styles";

function PersistBioWidget({ formik }) {
  return (
    <StyledPersistBio>
      <Checkbox
        name="persistBio"
        checked={formik.values.persistBio}
        onChange={() =>
          formik.setFieldValue("persistBio", !formik.values.persistBio)
        }
      >
        Save this biography for future applications
      </Checkbox>
    </StyledPersistBio>
  );
}

function Overview({ application, history, location }) {
  const { id } = application;
  const viewer = useViewer();
  const displayLinkedInInput = !application.specialist.linkedin;
  const isWidescreen = useBreakpoint("sUp");
  const [submitLinkedin] = useMutation(UPDATE_PROFILE);
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = ({ linkedin, ...values }) => {
    linkedin &&
      submitLinkedin({
        variables: { input: { linkedin } },
        optimisticResponse: {
          __typename: "Mutation",
          updateProfile: {
            __typename: "UpdateProfilePayload",
            specialist: { __typename: "Specialist", id: viewer.id, linkedin },
          },
        },
      });

    updateApplication({
      variables: { input: { id: id, ...values } },
      optimisticResponse: {
        __typename: "Mutation",
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          application: { __typename: "Application", ...application, ...values },
        },
      },
    });

    history.push(`/invites/${id}/apply/questions`, location.state);
  };

  const initialValues = {
    introduction: application.introduction || application.specialist.bio || "",
    linkedin: "",
    persistBio: !viewer?.bio,
    availability: application.availability || "",
  };

  return (
    <StepCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Box>
              <Text
                as="h1"
                mb="l"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
                letterSpacing="-0.01em"
              >
                Overview
              </Text>
              <Box mb={6}>
                <FormField
                  minRows={4}
                  as={StyledIntroduction}
                  name="introduction"
                  widget={PersistBioWidget}
                  formik={formik}
                  rowPadding={isWidescreen ? 64 : 80}
                  isWidescreen={isWidescreen}
                  charLimit={280}
                  label="Give a 2-3 line description of your background as it related to this project."
                  placeholder="Give a 2-3 line description of your background as it related to this project."
                />
              </Box>
              <Box mb={displayLinkedInInput ? 6 : 8}>
                <FormField
                  fullWidth
                  as={ChoiceList}
                  optionsPerRow={2}
                  name="availability"
                  onChange={formik.handleChange}
                  value={formik.values.availability}
                  error={false}
                  label="When are you available to start a new project?"
                  options={[
                    "Immediately",
                    "1 - 2 weeks",
                    "2 - 4 weeks",
                    "1 Month+",
                  ]}
                />
              </Box>
              {displayLinkedInInput ? (
                <Box mb={8}>
                  <FormField
                    name="linkedin"
                    label="LinkedIn Profile URL"
                    placeholder="https://www.linkedin.com/in/your-name/"
                  />
                </Box>
              ) : null}
              <SubmitButton size="l" suffix={<ArrowRight />}>
                Next
              </SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </StepCard>
  );
}

export default Overview;

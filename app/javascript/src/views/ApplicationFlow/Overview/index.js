import * as React from "react";
import { ArrowRight } from "@styled-icons/feather";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Box, Text, Checkbox, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { ChoiceList } from "src/components";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { updateApplication as UPDATE_APPLICATION } from "../queries";
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
        Save as my profile biography and persist for future applications
      </Checkbox>
    </StyledPersistBio>
  );
}

function Overview({ application, history, location }) {
  const { id } = application;
  const viewer = useViewer();
  const isWidescreen = useBreakpoint("sUp");
  const [mutate] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async (values) => {
    await mutate({
      variables: {
        input: {
          id: id,
          ...values,
        },
      },
    });

    history.push(`/invites/${id}/apply/questions`, location.state);
  };

  const initialValues = {
    introduction: application.introduction || application.specialist.bio || "",
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
              <Box mb="m">
                <FormField
                  minRows={4}
                  as={StyledIntroduction}
                  name="introduction"
                  widget={PersistBioWidget}
                  formik={formik}
                  rowPadding={isWidescreen ? 64 : 80}
                  isWidescreen={isWidescreen}
                  label="Give a 2-3 line description of your background as it related to this project."
                  placeholder="Give a 2-3 line description of your background as it related to this project."
                />
              </Box>
              <ChoiceList
                fullWidth
                optionsPerRow={2}
                name="availability"
                onChange={formik.handleChange}
                value={formik.values.availability}
                error={
                  formik.touched.availability && formik.errors.availability
                }
                label="When are you available to start a new project?"
                options={[
                  "Immediately",
                  "1 - 2 weeks",
                  "2 - 4 weeks",
                  "1 Month+",
                ]}
              />
              <SubmitButton mt="l" size="l" suffix={<ArrowRight />}>
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

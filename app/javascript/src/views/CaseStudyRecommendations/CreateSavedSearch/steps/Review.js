import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Error, Text, Tags, Link, Button, Box, Stack } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import Description from "../components/Description";

export default function Review({ caseStudySearch }) {
  const history = useHistory();

  const initialValues = {
    skills: [],
  };

  const handleSubmit = () => {
    history.push(`/explore/${caseStudySearch?.id}`);
  };

  return (
    <AnimatedCard>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <StepNumber>Step 4 of 4</StepNumber>
            <Header>Review</Header>
            <Description>Verify the information you have provided</Description>

            <Stack spacing={12} divider="neutral100">
              <Box>
                <Text
                  mb={3}
                  fontSize="2xl"
                  color="blue900"
                  lineHeight="xl"
                  fontWeight="medium"
                  letterSpacing="-0.06rem"
                >
                  Skills
                </Text>
                <Tags
                  size="m"
                  marginBottom={6}
                  tags={caseStudySearch.skills.map((s) => s.skill.label)}
                />
                <Link
                  to={{
                    pathname: `/explore/new/${caseStudySearch.id}/skills`,
                    state: { readyToPublish: true },
                  }}
                >
                  <Button
                    variant="subtle"
                    size="s"
                    prefix={<Pencil size={24} />}
                  >
                    Edit Skills
                  </Button>
                </Link>
              </Box>
              <Box>
                <Text
                  mb={3}
                  fontSize="2xl"
                  color="blue900"
                  lineHeight="xl"
                  fontWeight="medium"
                  letterSpacing="-0.06rem"
                >
                  Goals
                </Text>
                <Tags size="m" marginBottom={6} tags={caseStudySearch.goals} />
                <Link
                  to={{
                    pathname: `/explore/new/${caseStudySearch.id}/goals`,
                    state: { readyToPublish: true },
                  }}
                >
                  <Button
                    variant="subtle"
                    size="s"
                    prefix={<Pencil size={24} />}
                  >
                    Edit Goals
                  </Button>
                </Link>
              </Box>
            </Stack>
            <Error>{formik.status}</Error>
            <SubmitButton
              marginTop={10}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Confirm
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}

import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Select, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import { UPDATE_CLIENT_APPLICATION } from "../queries";

export const validationSchema = object().shape({
  companyType: string().required("Please enter your company type"),
});

export default function CompanyStage({ clientApplication }) {
  const [update] = useMutation(UPDATE_CLIENT_APPLICATION);
  const history = useHistory();

  const initialValues = {
    companyType: clientApplication.companyType || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    history.push("/clients/apply/goals");
  };

  return (
    <AnimatedCard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 2 of 4</StepNumber>
            <Header>Company Stage</Header>
            <Description>Some description</Description>
            <Box mb={6}>
              <Box mb={6}>
                <FormField
                  isRequired
                  as={Select}
                  error={null}
                  name="companyType"
                  placeholder="Select your company type"
                  label="Company Stage"
                  onChange={formik.handleChange}
                  data-testid="companyType"
                >
                  <option>Individual Entrepreneur</option>
                  <option>Small Business</option>
                  <option>Medium-Sized Business</option>
                  <option>Startup</option>
                  <option>Growth-Stage Startup</option>
                  <option>Major Corporation</option>
                  <option>Non-Profit</option>
                  <option>Education Institution</option>
                  <option>Government</option>
                </FormField>
              </Box>
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}

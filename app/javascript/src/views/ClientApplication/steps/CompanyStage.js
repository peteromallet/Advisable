import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box, Error } from "@advisable/donut";
import ChevronButtonInput from "src/components/ChevronButtonInput";
import { useNotifications } from "src/components/Notifications";
import FormField from "src/components/FormField";
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
  const { error } = useNotifications();
  const history = useHistory();

  const initialValues = {
    companyType: clientApplication.companyType || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    update({
      variables: { input: values },
      optimisticResponse: {
        __typename: "Mutation",
        updateClientApplication: {
          __typename: "UpdateClientApplicationPayload",
          clientApplication: {
            __typename: "ClientApplication",
            ...clientApplication,
            ...values,
          },
        },
      },
      onError: (err) => error(err.message),
    });

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
            <Description>
              This will help us tailor our recommendations to you.
            </Description>
            <Box mb={4}>
              <FormField
                size="l"
                as={ChevronButtonInput}
                fullWidth
                alignWidth
                name="companyType"
                error={null}
                label={null}
                options={[
                  {
                    label: "Individual Entrepreneur",
                    value: "Individual Entrepreneur",
                  },
                  {
                    label: "Small Business",
                    value: "Small Business",
                  },
                  {
                    label: "Medium-Sized Business",
                    value: "Medium-Sized Business",
                  },
                  { label: "Startup", value: "Startup" },
                  {
                    label: "Growth-Stage Startup",
                    value: "Growth-Stage Startup",
                  },
                  {
                    label: "Major Corporation",
                    value: "Major Corporation",
                  },
                ]}
                value={formik.values.companyType}
              />
            </Box>
            <Error>{formik.status}</Error>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}

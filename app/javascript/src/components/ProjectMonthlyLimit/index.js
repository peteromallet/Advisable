import React from "react";
import { Formik } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Mutation } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import Padding from "../../components/Spacing/Padding";
import SET_MONTHLY_LIMIT from "./setMonthlyLimit";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const ProjectMonthlyLimit = ({ applicationId }) => {
  const initialValues = {
    monthlyLimit: undefined,
  };

  const handleSubmit = setMonthlyLimit => async ({ monthlyLimit }) => {
    await setMonthlyLimit({
      variables: {
        input: {
          application: applicationId,
          monthlyLimit: monthlyLimit
            ? Number(monthlyLimit.replace(" hours", ""))
            : null,
        },
      },
    });
  };

  return (
    <Mutation mutation={SET_MONTHLY_LIMIT}>
      {(setMonthlyLimit, { loading }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(setMonthlyLimit)}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Padding bottom="l">
                <Heading>Set a monthly limit for this project</Heading>
              </Padding>
              <Padding bottom="l">
                <TextField
                  name="monthlyLimit"
                  mask={numberMask}
                  placeholder="Monthly limit"
                  label="Monthly hourly limit"
                  onChange={formik.handleChange}
                  value={formik.values.monthlyLimit}
                />
              </Padding>
              <ButtonGroup fullWidth>
                <Button loading={loading} styling="primary" type="submit">
                  Continue
                </Button>
              </ButtonGroup>
            </form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

export default ProjectMonthlyLimit;

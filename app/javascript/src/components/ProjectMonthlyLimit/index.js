import React from "react";
import { Formik } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Mutation } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import Padding from "../../components/Spacing/Padding";
import validationSchema from "./validationSchema";
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
          monthlyLimit,
        },
      },
    });
  };

  const handleChange = formik => e => {
    let value = e.target.value;
    value = value.replace(" hours", "");
    value = value.replace(/\,/g, "");
    value = Number(value);
    formik.setFieldTouched("monthlyLimit", true);
    formik.setFieldValue("monthlyLimit", value);
  };

  return (
    <Mutation mutation={SET_MONTHLY_LIMIT}>
      {(setMonthlyLimit, { loading }) => (
        <Formik
          isInitialValid={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                  onChange={handleChange(formik)}
                  value={formik.values.monthlyLimit}
                  error={
                    formik.touched.monthlyLimit && formik.errors.monthlyLimit
                  }
                />
              </Padding>
              <ButtonGroup fullWidth>
                <Button
                  type="submit"
                  loading={loading}
                  styling="primary"
                  disabled={!formik.isValid}
                >
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

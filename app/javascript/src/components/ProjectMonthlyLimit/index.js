import React from "react";
import { Formik } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Mutation } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import TextField from "../../components/TextField";
import Padding from "../../components/Spacing/Padding";
import validationSchema from "./validationSchema";
import SET_MONTHLY_LIMIT from "./setMonthlyLimit";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const ProjectMonthlyLimit = ({
  applicationId,
  onUpdate,
  buttonLabel,
  initialValues,
}) => {
  const initial = initialValues || {
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

    if (onUpdate) onUpdate();
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
          initialValues={initial}
          validationSchema={validationSchema}
          onSubmit={handleSubmit(setMonthlyLimit)}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Padding bottom="l">
                <TextField
                  autoFocus
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
                  aria-label={buttonLabel || "Set Monthly Limit"}
                  disabled={!formik.isValid}
                >
                  {buttonLabel || "Set Monthly Limit"}
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

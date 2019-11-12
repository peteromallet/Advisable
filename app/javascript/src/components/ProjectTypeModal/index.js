// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { Formik, Field } from "formik";
import { Box, Text, Checkbox, Button } from "@advisable/donut";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Modal from "../Modal";
import Radio from "../Radio";
import TextField from "../TextField";
import ButtonGroup from "../ButtonGroup";
import validationSchema from "./validationSchema";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const ProjectTypeModal = ({ isOpen, onClose, application, onSubmit }) => {
  const initialValues = {
    projectType: application.projectType,
    monthlyLimit: application.monthlyLimit,
    acceptCharges: false,
    acceptUpfrontCharges: false,
  };

  const handleLimitChange = formik => e => {
    let value = e.target.value;
    if (Boolean(value)) {
      value = value.replace(" hours", "");
      value = value.replace(/\,/g, "");
      value = Number(value);
    } else {
      value = undefined;
    }
    formik.setFieldTouched("monthlyLimit", true);
    formik.setFieldValue("monthlyLimit", value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text
          as="h4"
          color="neutral.9"
          fontWeight="semibold"
          fontSize="xl"
          mb="m"
        >
          How do you want to work with {application.specialist.firstName}?
        </Text>
        <Formik
          validateOnMount
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              {console.log(formik.values)}
              <Box mb="xs">
                <Field
                  as={Radio}
                  type="radio"
                  label="Projects - Predefined Projects"
                  value="Fixed"
                  name="projectType"
                  variation="bordered"
                  data-testid="fixed"
                  description="I want to work with them on predefined projects, with set deliverables and timelines."
                  onChange={e => {
                    formik.setFieldValue("acceptCharges", false);
                    formik.setFieldValue("acceptUpfrontCharges", false);
                    formik.handleChange(e);
                  }}
                />
              </Box>
              <Box mb="m">
                <Field
                  as={Radio}
                  type="radio"
                  label="Flexible - Monthly Limit"
                  value="Flexible"
                  name="projectType"
                  variation="bordered"
                  data-testid="flexible"
                  description="I want to propose a maximum monthly limit of hours and work flexibly within that."
                  onChange={e => {
                    formik.setFieldValue("acceptCharges", false);
                    formik.setFieldValue("acceptUpfrontCharges", false);
                    formik.handleChange(e);
                  }}
                />
              </Box>
              {formik.values.projectType === "Fixed" && (
                <Box mb="m">
                  <Field as={Checkbox} type="checkbox" name="acceptCharges">
                    I accept to be charged for each project I assign and that
                    payment will be released to the freelancer upon approval of
                    the work.
                  </Field>
                </Box>
              )}
              {formik.values.projectType === "Flexible" && (
                <>
                  <Box mb="m">
                    <TextField
                      autoFocus={!formik.values.monthlyLimit}
                      name="monthlyLimit"
                      mask={numberMask}
                      placeholder="Monthly limit"
                      label="Set a monthly hour cap (to 200-hour max)"
                      onChange={handleLimitChange(formik)}
                      value={formik.values.monthlyLimit}
                      error={
                        formik.touched.monthlyLimit &&
                        formik.errors.monthlyLimit
                      }
                    />
                  </Box>
                  <Box mb="s">
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="acceptUpfrontCharges"
                    >
                      I accept that I will be charged 50% of the monthly limit
                      immediately
                    </Field>
                  </Box>
                  <Box mb="m">
                    <Field as={Checkbox} type="checkbox" name="acceptCharges">
                      I consent to being charged for all hours I approve within
                      the monthly limit I have specified, until I stop working
                      with {application.specialist.firstName}
                    </Field>
                  </Box>
                </>
              )}
              <Box top="m">
                <ButtonGroup fullWidth>
                  <Button
                    type="submit"
                    intent="success"
                    appearance="primary"
                    disabled={!formik.isValid}
                    loading={formik.isSubmitting}
                    aria-label="Continue"
                  >
                    Continue
                  </Button>
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProjectTypeModal;

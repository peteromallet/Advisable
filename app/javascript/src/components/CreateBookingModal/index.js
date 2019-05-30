// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Modal from "../Modal";
import Radio from "../Radio";
import Button from "../Button";
import Heading from "../Heading";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import TextField from "../../components/TextField";
import validationSchema from "./validationSchema";
import START_WORKING from "./startWorking";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const CreateBookingModal = ({ isOpen, onClose, application, onCreate }) => {
  const handleSubmit = mutate => async values => {
    const { data } = await mutate({
      variables: {
        input: {
          application: application.airtableId,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit,
        },
      },
    });

    onCreate(data.startWorking.application);
  };

  const initialValues = {
    projectType: application.projectType,
    monthlyLimit: application.monthlyLimit,
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

  const isInitialValid = validationSchema.isValidSync(initialValues);

  return (
    <Mutation mutation={START_WORKING}>
      {startWorking => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Padding size="xl" bottom="m">
            <Heading level={3}>
              How do you want to work with {application.specialist.firstName}?
            </Heading>
          </Padding>
          <Formik
            onSubmit={handleSubmit(startWorking)}
            initialValues={initialValues}
            isInitialValid={isInitialValid}
            validationSchema={validationSchema}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <Padding left="xl" right="xl">
                  <Padding bottom="s">
                    <Radio
                      label="Fixed"
                      value="Fixed"
                      name="projectType"
                      variation="bordered"
                      data-testid="fixed"
                      onChange={formik.handleChange}
                      checked={formik.values.projectType === "Fixed"}
                      description="I want to work with them on one big project or a number of smaller tasks"
                    />
                  </Padding>
                  <Padding bottom="s">
                    <Radio
                      label="Flexible"
                      value="Flexible"
                      name="projectType"
                      variation="bordered"
                      data-testid="flexible"
                      onChange={formik.handleChange}
                      checked={formik.values.projectType === "Flexible"}
                      description="I want to work with them flexibly with monthly limits"
                    />
                  </Padding>
                  {formik.values.projectType === "Flexible" && (
                    <Padding top="m" bottom="s">
                      <TextField
                        autoFocus={!Boolean(formik.values.monthlyLimit)}
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
                    </Padding>
                  )}
                </Padding>
                <Padding top="m" size="xl">
                  <ButtonGroup fullWidth>
                    <Button
                      type="submit"
                      styling="primary"
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
                </Padding>
              </form>
            )}
          </Formik>
        </Modal>
      )}
    </Mutation>
  );
};

export default CreateBookingModal;

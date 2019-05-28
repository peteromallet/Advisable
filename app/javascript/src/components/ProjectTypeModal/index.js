// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { Formik } from "formik";
import Modal from "../Modal";
import Radio from "../Radio";
import Button from "../Button";
import Heading from "../Heading";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import validationSchema from "./validationSchema";

const ProjectTypeModal = ({
  isOpen,
  onClose,
  firstName,
  initialValues,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl" bottom="m">
        <Heading level={3}>How do you want to work with {firstName}?</Heading>
      </Padding>
      <Formik
        onSubmit={onSubmit}
        isInitialValid={false}
        initialValues={initialValues}
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
                  onChange={formik.handleChange}
                  checked={formik.values.projectType === "Flexible"}
                  description="I want to work with them flexibly with monthly limits"
                />
              </Padding>
            </Padding>
            <Padding top="m" size="xl">
              <ButtonGroup fullWidth>
                <Button
                  type="submit"
                  styling="primary"
                  disabled={!formik.isValid}
                  loading={formik.isSubmitting}
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
  );
};

export default ProjectTypeModal;

// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { Formik } from "formik";
import { graphql } from "react-apollo";
import Modal from "../Modal";
import Radio from "../Radio";
import Heading from "../Heading";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { Padding } from "../Spacing";
import validationSchema from "./validationSchema";
import START_WORKING from "./startWorking.graphql";

const Component = ({
  isOpen,
  onClose,
  firstName,
  applicationId,
  mutate,
  onCreate,
}) => {
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    projectType: "",
  };

  const handleSubmit = async values => {
    setLoading(true);
    const response = await mutate({
      variables: {
        input: {
          application: applicationId,
          projectType: values.projectType,
        },
      },
    });

    const { errors, application } = response.data.startWorking;

    if (!errors) {
      onCreate(application);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl" bottom="m">
        <Heading level={3}>How do you want to work with {firstName}?</Heading>
      </Padding>
      <Formik
        onSubmit={handleSubmit}
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
                  disabled={!formik.isValid}
                  styling="primary"
                  loading={loading}
                  type="submit"
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

export default graphql(START_WORKING)(Component);

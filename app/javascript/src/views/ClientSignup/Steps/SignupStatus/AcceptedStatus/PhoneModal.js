import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Text, Modal, Box } from "@advisable/donut";
import SubmitButton from "../../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { useLocationState } from "../../../queries";
import { number, object } from "yup";
import PhoneInput from "../../../../../components/PhoneInput";

const validationSchema = object().shape({
  phoneNumber: number().required("required field"),
});

function PhoneModal({ requestApplicationCallback, modal }) {
  const { applicationId } = useLocationState();
  // Formik
  const initialValues = { phoneNumber: "" };
  const handleSubmit = ({ phoneNumber }) => {
    requestApplicationCallback({
      variables: { id: applicationId, phoneNumber },
    });
    modal.hide();
  };

  return (
    <Modal modal={modal} p="m">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={validationSchema}
      >
        <Form>
          <Text
            fontSize="xxxl"
            lineHeight="xxxl"
            color="blue.8"
            fontWeight="semibold"
            mb="m"
          >
            We will call you
          </Text>
          <Box mb="m">
            <FormField
              type="tel"
              as={PhoneInput}
              name="phoneNumber"
              label="Leave your phone number, please"
              placeholder="Contact number"
            />
          </Box>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}

PhoneModal.propTypes = {
  requestApplicationCallback: PropTypes.func,
  modal: PropTypes.object,
};

export default PhoneModal;

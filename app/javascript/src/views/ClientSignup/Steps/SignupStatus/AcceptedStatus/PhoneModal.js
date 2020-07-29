import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Modal, Box } from "@advisable/donut";
import SubmitButton from "../../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { useLocationState } from "../../../queries";
import { object, string } from "yup";
import PhoneInput from "../../../../../components/PhoneInput";
import { Title } from "../../styles";

const validationSchema = object().shape({
  phoneNumber: string().required("required field"),
});

function PhoneModal({ requestApplicationCallback, modal }) {
  const { applicationId } = useLocationState();
  // Formik
  const initialValues = { phoneNumber: "" };
  const handleSubmit = ({ phoneNumber }) => {
    requestApplicationCallback({
      variables: { input: { id: applicationId, phoneNumber } },
    });
    modal.hide();
  };

  return (
    <Modal modal={modal} p="m" label="We will call you">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={validationSchema}
      >
        <Form>
          <Title mb="m">We will call you</Title>
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

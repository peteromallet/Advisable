import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useHistory, useLocation } from "react-router";
import { Modal, Box } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import PhoneNumberInput from "src/components/PhoneNumberInput";
import { Title } from "../../styles";

const validatePhoneNumber = (number) => {
  const isEmpty = !number;
  if (isEmpty) return "Please enter your phone number";
  return;
};

function PhoneModal({ requestApplicationCallback, modal, countryCode }) {
  const location = useLocation();
  const history = useHistory();
  // Formik
  const initialValues = { phoneNumber: "" };
  const handleSubmit = async ({ phoneNumber }) => {
    await requestApplicationCallback({
      variables: { input: { id: location.state?.applicationId, phoneNumber } },
    });
    modal.hide();
    history.push({
      pathname: "/clients/signup/thank-you-call-you-shortly",
      state: location.state,
    });
  };

  return (
    <Modal modal={modal} p="m" label="We will call you">
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Title mb="m">We will call you</Title>
            <Box mb="m">
              <FormField
                type="tel"
                name="phoneNumber"
                as={PhoneNumberInput}
                label="Leave your phone number, please"
                placeholder="Contact number"
                initialCountry={countryCode}
                validate={validatePhoneNumber}
                onChange={(number) =>
                  formik.setFieldValue("phoneNumber", number)
                }
              />
            </Box>
            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

PhoneModal.propTypes = {
  requestApplicationCallback: PropTypes.func,
  modal: PropTypes.object,
  countryCode: PropTypes.string,
};

export default PhoneModal;

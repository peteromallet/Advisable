import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Modal, Box } from "@advisable/donut";
import SubmitButton from "../../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { useLocationState } from "../../../queries";
import PhoneInput from "../../../../../components/PhoneInput";
import "react-phone-number-input/style.css";
import { Title } from "../../styles";
import { isValidPhoneNumber } from "react-phone-number-input";

const validatePhoneNumber = (number) => {
  const isEmpty = !number;
  if (isEmpty) return "Please enter your phone number";
  const isValid = isValidPhoneNumber(number);
  if (!isValid) return "Please enter valid phone number";
  return;
};

function PhoneModal({ requestApplicationCallback, modal, countryCode }) {
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
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Title mb="m">We will call you</Title>
            <Box mb="m">
              <FormField
                type="tel"
                as={PhoneInput}
                name="phoneNumber"
                label="Leave your phone number, please"
                placeholder="Contact number"
                defaultCountry={countryCode}
                error={null}
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

import * as Yup from "yup";
import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button } from "@advisable/donut";
import Modal from "../../../components/Modal";
import TextField from "../../../components/TextField";

const EmailModal = ({ isOpen, onClose }) => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text fontSize="xl" fontWeight="medium" color="neutral.9" mb="xs">
          Save your search
        </Text>
        <Text fontSize="s" color="neutral.7" lineHeight="s" mb="m">
          Great! We think we’ll have the perfect person for this project. Enter
          your email to save your details so far.
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {formik => (
            <Form>
              <Box mb="l">
                <TextField
                  autoFocus
                  name="email"
                  label="Email Address"
                  onBlur={formik.handleBlur}
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.submitCount > 0 && formik.errors.email}
                />
              </Box>
              <Button
                appearance="primary"
                intent="success"
                iconRight="arrow-right"
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EmailModal;

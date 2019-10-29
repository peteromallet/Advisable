import * as Yup from "yup";
import React from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-apollo";
import { Formik, Form } from "formik";
import { Box, Text, Button } from "@advisable/donut";
import CREATE_ACCOUNT from "../createAccount";
import Modal from "../../../components/Modal";
import TextField from "../../../components/TextField";

const EmailModal = ({ selected, isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
  });

  const handleSubmit = async (values, formik) => {
    const response = await createAccount({
      variables: {
        input: {
          skill: get(location, "state.search.skill"),
          industry: get(location, "state.search.industry"),
          companyType: get(location, "state.search.companyType"),
          email: values.email,
        },
      },
    });

    formik.setSubmitting(false);

    if (response.errors) {
      const code = get(response.errors, "[0].extensions.code");
      if (code === "emailTaken") {
        formik.setFieldError("email", t("errors.emailTaken"));
      } else if (code === "nonCorporateEmail") {
        formik.setFieldError("email", t("errors.nonCorporateEmail"));
      } else {
        formik.setStatus("errors.somethingWentWrong");
      }
    } else {
      const project = response.data.createUserAccount.project;
      let url = "https://advisable.com/apply-to-be-a-client/";
      url += `?pid=${project.airtableId}`;
      url += `&email=${encodeURIComponent(values.email)}`;
      url += `&skill=${get(location, "state.search.skill")}`;
      if (selected.length > 0) {
        url += `&specialists=${selected.join(",")}`;
      }
      window.location = url;
    }
  };

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
          onSubmit={handleSubmit}
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
              {formik.status && (
                <Text color="red.6" fontSize="s" mb="m">
                  {t(formik.status)}
                </Text>
              )}
              <Button
                appearance="primary"
                intent="success"
                iconRight="arrow-right"
                loading={formik.isSubmitting}
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

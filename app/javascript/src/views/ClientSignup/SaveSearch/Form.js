import React from "react";
import { object, string } from "yup";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Text, Button, Link, Icon } from "@advisable/donut";
import TextField from "../../../components/TextField";

const SaveSearchForm = ({ onSubmit }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const initialValues = {
    email: "",
  };

  const validationSchema = object({
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
  });

  return (
    <>
      <Link.External href="#" onClick={history.goBack}>
        <Box mr="xxs" display="inline-block">
          <ArrowLeft size={16} strokeWidth={2} />
        </Box>
        Back
      </Link.External>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
      >
        <Text
          as="h2"
          mb="xs"
          color="blue.8"
          fontSize="xxxl"
          lineHeight="xxxl"
          fontWeight="semibold"
          letterSpacing="-0.025em"
        >
          Save your search
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <Box maxWidth={550} mb="xl">
          <Text color="neutral.9" lineHeight="m">
            Great! We think we’ll have the perfect person for this project.
            Enter your email to save your details so far.
          </Text>
        </Box>
      </motion.div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {(formik) => (
          <Form>
            <Box mb="xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
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
              </motion.div>
            </Box>
            {formik.status && (
              <Text color="red.6" fontSize="s" mb="m">
                {t(formik.status)}
              </Text>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Button
                size="l"
                type="submit"
                loading={formik.isSubmitting}
                suffix={<ArrowRight />}
              >
                Continue
              </Button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SaveSearchForm;

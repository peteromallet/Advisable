import {
  ArrowSmRight,
  QuestionMarkCircle,
} from "@styled-icons/heroicons-solid";
import { motion } from "framer-motion";
import { object, string } from "yup";
import { Textarea } from "@advisable/donut";
import { Formik, Form } from "formik";
import React from "react";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useUpdateCompany } from "./queries";
import { trackEvent } from "src/utilities/segment";

const validationSchema = object().shape({
  audience: string()
    .required("Please tell us about your customers")
    .max(60, "Please keep this under 60 characters"),
});

export default function Audience({ data }) {
  const [update] = useUpdateCompany();

  const navigate = useNavigate();
  const initialValues = {
    audience: data?.currentCompany?.audience || "",
  };

  const handleSubmit = async (values) => {
    const response = await update({
      variables: {
        input: values,
      },
    });

    trackEvent("Setup - Submitted Audience", { audience: values.audience });
    navigate("/setup/hiring");
  };

  return (
    <div className="mx-auto w-[1080px] block lg:flex gap-10">
      <div className="lg:min-w-[680px] w-full pb-6 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 md:p-10"
        >
          <h2 className="font-semibold text-2xl md:text-3xl tracking-tight leading-none mb-2 text-blue900">
            Who are your ideal customers?
          </h2>
          <p className="md:text-lg text-neutral700 mb-8">
            We’ll use this to recommend projects that were targeted at similar
            customers.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
            <Form>
              <div className="mb-10">
                <FormField
                  minRows={3}
                  as={Textarea}
                  name="audience"
                  charLimit={60}
                  label="Customer description"
                  placeholder="e.g Startups in fintech"
                />
              </div>
              <SubmitButton
                variant="gradient"
                size="l"
                suffix={<ArrowSmRight />}
                width={{ _: "100%", m: "auto" }}
              >
                Continue
              </SubmitButton>
            </Form>
          </Formik>
        </motion.div>
      </div>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-neutral100 p-6 md:p-10 border-2 border-solid border-neutral200"
        >
          <QuestionMarkCircle className="w-10 h-10 mb-4 -ml-1 text-blue900" />

          <p className="mb-8 text-lg">
            Use a simple, precise description to get the best results.
          </p>

          <h5 className="font-medium mb-1">Examples</h5>
          <ul className="text-neutral900">
            <li>Startup founders</li>
            <li>Marketers</li>
            <li>FinTech startups</li>
            <li>Mid-sized German companies</li>
            <li>CFOs at large companies</li>
            <li>Software Developers</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

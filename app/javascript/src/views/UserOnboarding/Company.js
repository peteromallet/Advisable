import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Input, Select } from "@advisable/donut";
import React from "react";
import SubmitButton from "src/components/SubmitButton";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import { object, string } from "yup";
import FormField from "src/components/FormField";
import { useUpdateCompany } from "./queries";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "src/utilities/segment";

const validationSchema = object().shape({
  name: string().required("Please provide your company name"),
});

export default function Company({ data }) {
  const navigate = useNavigate();
  const [update] = useUpdateCompany();

  const initialValues = {
    name: data?.currentCompany?.name || "",
    businessType: data?.currentCompany?.businessType || "B2B",
    kind: data?.currentCompany?.kind || "Startup",
  };

  const handleSubmit = async (values) => {
    await update({ variables: { input: values } });
    trackEvent("Setup - Submitted Company", values);
    navigate("../industry");
  };

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-xl shadow-xl md:p-10"
      >
        <h2 className="mb-2 text-2xl font-semibold tracking-tight leading-none md:text-3xl text-blue900">
          Tell us about your company
        </h2>
        <p className="mb-8 md:text-lg text-neutral700">
          We’ll use this information to recommend projects relevant to your
          company.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          <Form>
            <div className="mb-4">
              <FormField
                id="companyName"
                as={Input}
                name="name"
                label="Company name"
                placeholder="Dunder Mifflin"
              />
            </div>

            <div className="mb-4">
              <FormField
                label="What stage is your company at?"
                id="kind"
                as={Select}
                name="kind"
              >
                <option>Startup</option>
                <option>Growth Stage Startup</option>
                <option>Individual Entrepreneur</option>
                <option>Education Institution</option>
                <option>Medium-Sized Business</option>
                <option>Non-Profit</option>
                <option>Government</option>
                <option>Small Business</option>
                <option>Major Corporation</option>
              </FormField>
            </div>

            <div className="mb-8">
              <FormField
                label="Are you B2B or B2C"
                id="businessType"
                as={Select}
                name="businessType"
              >
                <option>B2B</option>
                <option>B2C</option>
              </FormField>
            </div>

            <SubmitButton
              variant="gradient"
              size="l"
              width={{ _: "100%", m: "auto" }}
              suffix={<ArrowSmRight />}
              disableUntilValid
            >
              Continue
            </SubmitButton>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
}

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

const validationSchema = object().shape({
  name: string().required("Please provide your company name"),
  intent: string().required(
    "Please let us know how you are planning on using Advisable",
  ),
});

export default function Company({ data }) {
  const navigate = useNavigate();
  const [update] = useUpdateCompany();

  const initialValues = {
    name: data?.currentCompany?.name || "",
    businessType: data?.currentCompany?.businessType || "B2B",
    intent: data?.currentCompany?.intent || "",
    kind: data?.currentCompany?.kind || "Startup",
  };

  const handleSubmit = async (values) => {
    const response = await update({
      variables: { input: values },
    });

    navigate("../industry");
  };

  return (
    <div className="mx-auto max-w-[640px] w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-xl p-10"
      >
        <h2 className="font-semibold text-3xl tracking-tight leading-none mb-2 text-blue900">
          Tell us about your company
        </h2>
        <p className="text-lg text-neutral700 mb-8">
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
                <option>Growth-Stage Startup</option>
                <option>Small Business</option>
                <option>Major Corporation</option>
              </FormField>
            </div>

            <div className="mb-4">
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

            <div className="mb-10">
              <FormField
                id="intent"
                as={Select}
                name="intent"
                label="How are you planning to use Advisable?"
                placeholder="How are you planning to use Advisable?"
              >
                <option>I'm just looking around</option>
                <option>I'm looking to hire someone</option>
                <option>I'm looking for ideas</option>
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

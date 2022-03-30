import {
  ArrowSmRight,
  QuestionMarkCircle,
} from "@styled-icons/heroicons-solid";
import { object, string } from "yup";
import { Textarea } from "@advisable/donut";
import { Formik, Form } from "formik";
import React from "react";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useNavigate } from "react-router-dom";

const validationSchema = object().shape({
  audience: string()
    .required("Please tell us about your customers")
    .max(60, "Please keep this under 60 characters"),
});

export default function Customers() {
  const navigate = useNavigate();
  const initialValues = {
    audience: "",
  };

  const handleSubmit = async (values) => {
    navigate("/setup/interests");
  };

  return (
    <div className="mx-auto w-[1080px] flex gap-10">
      <div className="min-w-[680px] w-full pb-12">
        <div className="bg-white rounded-xl shadow-xl p-10">
          <h2 className="font-semibold text-3xl tracking-tight leading-none mb-2 text-blue900">
            Who are your customers?
          </h2>
          <p className="text-lg text-neutral700 mb-8">
            Let us know who your customers are and we’ll use this to help find
            case studies that were targeted at similar customers.
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
              >
                Continue
              </SubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="w-full">
        <div className="rounded-xl bg-neutral100 p-10 border-2 border-solid border-neutral200">
          <QuestionMarkCircle className="w-10 h-10 mb-4 -ml-1 text-blue900" />

          <p className="mb-8 text-lg">
            Try to be as specific as possible to get the best results.
          </p>

          <h5 className="font-medium mb-1">Examples</h5>
          <ul className="text-neutral900">
            <li>Startups in fintech</li>
            <li>Entrepreneurs in fashion</li>
            <li>Accounting companies in Germany</li>
            <li>Some other example</li>
            <li>Another example</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

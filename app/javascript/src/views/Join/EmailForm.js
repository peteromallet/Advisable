import React from "react";
import { useNavigate } from "react-router";
import { useSearchParams, useMatch } from "react-router-dom";
import { Input, Error } from "@advisable/donut";
import { object, string, ref } from "yup";
import { Form, Formik } from "formik";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useCreateClientAccount, useCreateFreelancerAccount } from "./queries";

const validationSchema = object().shape({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default function EmailForm() {
  const isClient = useMatch("/join/client");
  const [createClientAccount] = useCreateClientAccount();
  const [createFreelancerAccount] = useCreateFreelancerAccount();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const createAccount = isClient
      ? createClientAccount
      : createFreelancerAccount;

    const payload = isClient
      ? {
          rid: searchParams.get("rid"),
          utmCampaign: searchParams.get("utm_campaign"),
          utmContent: searchParams.get("utm_content"),
          utmSource: searchParams.get("utm_source"),
          utmMedium: searchParams.get("utm_medium"),
        }
      : {
          pid: searchParams.get("pid"),
          campaignName: searchParams.get("utm_campaign"),
          campaignSource: searchParams.get("utm_source"),
          referrer: searchParams.get("rid"),
        };

    const res = await createAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          ...payload,
        },
      },
    });
    if (res.errors) {
      setStatus("Something went wront. Please try again.");
      return;
    }
    navigate(isClient ? "/setup/company" : "/freelancers/apply");
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ status }) => (
        <Form>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <FormField
                // autoFocus
                as={Input}
                name="firstName"
                size={["sm", "md"]}
                className="w-full"
                placeholder="First name"
              />
            </div>
            <div className="w-full">
              <FormField
                as={Input}
                name="lastName"
                size={["sm", "md"]}
                className="w-full"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="mb-4">
            <FormField
              as={Input}
              name="email"
              size={["sm", "md"]}
              placeholder="Email address"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <FormField
                type="password"
                name="password"
                size={["sm", "md"]}
                placeholder="Password"
              />
            </div>
            <div className="w-full">
              <FormField
                type="password"
                size={["sm", "md"]}
                name="passwordConfirmation"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <Error>{status}</Error>
          <SubmitButton size={["m", "l"]} variant="gradient" width="100%">
            Create Your Free Account
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
}

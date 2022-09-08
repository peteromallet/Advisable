import React from "react";
import { Form, Formik } from "formik";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router";
import { useSearchParams, useMatch } from "react-router-dom";
import { Input, useBreakpoint } from "@advisable/donut";
import Divider from "src/components/Divider";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import { useCreateClientAccount, useCreateFreelancerAccount } from "./queries";

const ERROR_CODE_MESSAGES = {
  EMAIL_TAKEN: "An account with that email already exists",
  default: "Something went wrong. Please try again.",
};

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

export default function SignupForm() {
  const isMobile = useBreakpoint("s");
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
      const code = res.errors[0]?.extensions?.code;
      const message = ERROR_CODE_MESSAGES[code] || ERROR_CODE_MESSAGES.default;
      setStatus(message);
      return;
    }
    navigate(isClient ? "/setup/company" : "/freelancers/apply");
  };

  return (
    <>
      <LoginWithGoogle
        size={isMobile ? "l" : "xl"}
        mode={isClient ? "user" : "specialist"}
        navigate={isClient ? "/setup/company" : "/freelancers/apply"}
      >
        Signup with Google
      </LoginWithGoogle>
      <Divider py={[4, 6]}>Or</Divider>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ status }) => (
          <Form>
            <div className="flex flex-col gap-4 mb-4 sm:flex-row">
              <div className="w-full">
                <FormField
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
            <div className="flex flex-col gap-4 mb-4 sm:flex-row">
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
            {status && (
              <div className="py-2 px-4 mb-4 text-red-900 bg-red-100 rounded-md border border-red-700 border-solid">
                {status}
              </div>
            )}
            <SubmitButton size={["m", "l"]} variant="gradient" width="100%">
              Create Your Free Account
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}

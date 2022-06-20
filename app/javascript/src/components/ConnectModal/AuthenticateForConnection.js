import React, { useState } from "react";
import { ArrowLeft } from "@styled-icons/heroicons-solid";
import { Link } from "@advisable/donut";
import CircularButton from "../CircularButton";
import LoginForm from "src/views/Login/LoginForm";
import CreateAccountForm from "./CreateAccountForm";
import { useCreateClientAccount, useCreateFreelancerAcccount } from "./queries";
import { useApolloClient } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import OptionsList, { OptionsListOption } from "./OptionsList";

function ConnectModalSignup({ specialist, setStep }) {
  return (
    <>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center max-w-[360px] mx-auto">
        Connect with {specialist.firstName} and thousands of other specialists
      </h3>
      <p className="text-center mb-6 text-neutral700 max-w-[400px] mx-auto">
        Advisable lets you discover how leading marketers did their most
        impactful work, Learn from their case studies and collaborate with the
        people behind them.
      </p>
      <div className="mb-6">
        <OptionsList>
          <OptionsListOption
            title="Signup as a company"
            onClick={() => setStep("CLIENT_SIGNUP")}
          >
            Find proven people and projects
          </OptionsListOption>
          <OptionsListOption
            title="Signup as a freelancer"
            onClick={() => setStep("FREELANCER_SIGNUP")}
          >
            Be found for freelance projects
          </OptionsListOption>
        </OptionsList>
      </div>
      <div className="text-center">
        <h5 className="font-medium mb-2">Already have an Advisable account?</h5>
        <Link as="button" variant="underlined" onClick={() => setStep("LOGIN")}>
          Login
        </Link>
      </div>
    </>
  );
}

function ConnectModalLogin({ specialist, setStep }) {
  return (
    <div>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={() => setStep("SIGNUP")} />
      </div>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center max-w-[360px] mx-auto">
        Welcome back!
      </h3>
      <p className="text-center mb-6 text-neutral700 max-w-[400px] mx-auto">
        Login to your account to connect with {specialist.firstName}.
      </p>
      <LoginForm />
    </div>
  );
}

function ConnectModalClientSignup({ specialist, setStep }) {
  const client = useApolloClient();
  const [createClientAccount] = useCreateClientAccount();

  const handleSubmit = async (values, formik) => {
    formik.setStatus(null);

    const { errors, data } = await createClientAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      },
    });

    if (errors) {
      formik.setErrors(errors[0]?.message);
    } else {
      await client.resetStore();

      client.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.createClientAccount.viewer,
        },
      });
    }
  };
  return (
    <div>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={() => setStep("SIGNUP")} />
      </div>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center max-w-[360px] mx-auto">
        Welcome to Advisable!
      </h3>
      <p className="text-center mb-6 text-neutral700 max-w-[400px] mx-auto">
        Create an account to connect with {specialist.firstName}.
      </p>
      <CreateAccountForm onSubmit={handleSubmit} />
    </div>
  );
}

function ConnectModalFreelancerSignup({ specialist, setStep }) {
  const client = useApolloClient();
  const [createFreelancerAccount] = useCreateFreelancerAcccount();

  const handleSubmit = async (values, formik) => {
    formik.setStatus(null);

    const { errors, data } = await createFreelancerAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      },
    });

    if (errors) {
      formik.setErrors(errors[0]?.message);
    } else {
      await client.resetStore();

      client.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.createFreelancerAccount.viewer,
        },
      });
    }
  };
  return (
    <div>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={() => setStep("SIGNUP")} />
      </div>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center max-w-[360px] mx-auto">
        Welcome to Advisable!
      </h3>
      <p className="text-center mb-6 text-neutral700 max-w-[400px] mx-auto">
        Create an account to connect with {specialist.firstName}.
      </p>
      <CreateAccountForm onSubmit={handleSubmit} />
    </div>
  );
}

export default function AuthenticateForConnection(props) {
  const [step, setStep] = useState("SIGNUP");

  switch (step) {
    case "LOGIN": {
      return <ConnectModalLogin setStep={setStep} {...props} />;
    }
    case "CLIENT_SIGNUP": {
      return <ConnectModalClientSignup setStep={setStep} {...props} />;
    }
    case "FREELANCER_SIGNUP": {
      return <ConnectModalFreelancerSignup setStep={setStep} {...props} />;
    }
    default: {
      return <ConnectModalSignup setStep={setStep} {...props} />;
    }
  }
}

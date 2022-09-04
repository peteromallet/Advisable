import React from "react";
import Card from "./Card";
import GeneralForm from "./GeneralForm";
import SignupForm from "./SignupForm";
import BackButton from "./BackButton";
import GridLines from "src/components/GridLines";

const HeaderWrapper = ({ children }) => (
  <div className="overflow-hidden relative p-6 sm:p-10 py-6 sm:py-8 bg-blue-100 bg-gradient-to-br from-indigo-900 to-violet-900">
    {children}
  </div>
);
const FormWrapper = ({ children }) => (
  <div className="p-6 pt-5 sm:p-10 sm:pt-8">{children}</div>
);
const Title = ({ children }) => (
  <h2 className="font-serif font-semibold text-xl sm:text-2xl tracking-tight text-white">
    {children}
  </h2>
);
const Subtitle = ({ children }) => <p className="text-white">{children}</p>;

export function Client() {
  return (
    <Card>
      <HeaderWrapper>
        <GridLines color="rgb(255 255 255 / .1)" highlight="#FFFFFF" />
        <div className="flex gap-4">
          <BackButton />
          <div>
            <Title>Signup as a client</Title>
            <Subtitle>Explore case studies and hire freelancers</Subtitle>
          </div>
        </div>
      </HeaderWrapper>
      <FormWrapper>
        {/* <GeneralForm /> */}
        <SignupForm />
      </FormWrapper>
    </Card>
  );
}

export function Freelancer() {
  return (
    <Card>
      <HeaderWrapper>
        <GridLines color="rgb(255 255 255 / .1)" highlight="#FFFFFF" />
        <div className="flex gap-4">
          <BackButton />
          <div>
            <Title>Signup as a freelancer</Title>
            <Subtitle>Create case studies and find best opportunities</Subtitle>
          </div>
        </div>
      </HeaderWrapper>
      <FormWrapper>
        {/* <GeneralForm /> */}
        <SignupForm />
      </FormWrapper>
    </Card>
  );
}

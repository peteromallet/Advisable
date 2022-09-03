import React from "react";
import Card from "./Card";
import GeneralForm from "./GeneralForm";
import SignupForm from "./SignupForm";
import BackButton from "src/components/BackButton";
import GridLines from "src/components/GridLines";

export default function Client() {
  return (
    <Card>
      <div className="overflow-hidden relative p-10 pb-8 pt-8 bg-blue-100 bg-gradient-to-br from-indigo-900 to-violet-900">
        <GridLines color="rgb(255 255 255 / .1)" highlight="#FFFFFF" />
        <div className="flex gap-4">
          <BackButton />
          <div>
            <h2 className="font-serif font-semibold text-2xl md:text-2xl tracking-tight leading-none text-white">
              Signup as a client
            </h2>
            <p className="text-white">
              Explore case studies and hire freelancers
            </p>
          </div>
        </div>
      </div>
      <div className="p-10 pt-8">
        {/* <GeneralForm /> */}
        <SignupForm />
      </div>
    </Card>
  );
}

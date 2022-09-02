import React from "react";
import Card from "./Card";
import GeneralForm from "./GeneralForm";
import BackButton from "src/components/BackButton";

export default function JoinFreelancer() {
  return (
    <Card>
      <div className="flex mb-8 gap-3 items-center">
        <BackButton />
        <h2 className="font-semibold text-xl tracking-tight leading-none text-neutral900">
          Signup as a freelancer
        </h2>
      </div>
      <GeneralForm />
    </Card>
  );
}

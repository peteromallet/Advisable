import React from "react";
import Card from "./Card";
import GeneralForm from "./GeneralForm";
import BackButton from "src/components/BackButton";

export default function Client() {
  return (
    <Card>
      <div className="flex items-center mb-8 gap-3">
        <BackButton />
        <h2 className="font-semibold text-2xl md:text-2xl tracking-tight leading-none text-neutral900">
          Start discovering SaaS projects
        </h2>
      </div>
      <GeneralForm />
    </Card>
  );
}

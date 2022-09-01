import React from "react";
import { Heading } from "@advisable/donut";
import GeneralForm from "./GeneralForm";
import Card from "./Card";

export default function Client() {
  return (
    <Card>
      <div className="text-center mb-8">
        <Heading size="4xl" marginBottom={3}>
          Start discovering SaaS projects
        </Heading>
      </div>
      <GeneralForm />
    </Card>
  );
}

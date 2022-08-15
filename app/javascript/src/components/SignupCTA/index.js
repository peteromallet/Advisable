import React from "react";
import Button from "../Button";

export default function SignupCTA() {
  return (
    <div className="mt-6 shadow-lg bg-blue900 px-12 py-16 rounded-xl">
      <h1 className="text-white text-5xl font-semibold tracking-tight max-w-[400px] mb-6">
        Get full access to Advisable
      </h1>
      <p className="text-white text-lg w-[600px] mb-8">
        Advisable is the home to the world's best marketing and growth projects
        - sign up to gain full access to all projects on Advisable and
        collaborate with the experts behind them.
      </p>
      <Button size="lg">Get full access</Button>
    </div>
  );
}

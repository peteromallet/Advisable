import React from "react";
import Button from "src/components/Button";
import { Link } from "react-router-dom";
import GridLines from "src/components/GridLines";

export default function LimitedContentSignup() {
  return (
    <div className="overflow-hidden relative z-10 p-12 rounded-xl shadow-xl bg-blue900">
      <GridLines color="#370077" highlight="#8322F5" />
      <div className="relative z-20">
        <h1 className="mb-5 font-serif text-4xl font-semibold tracking-tight leading-tight text-white max-w-[400px]">
          Explore 100s of case studies for free
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-white opacity-80 w-[460px]">
          Get free access to our full library of SaaS marketing case studies.
          You only pay when you hire someone you discover through us!
        </p>
        <div className="flex gap-4">
          <Link to="/clients/join">
            <Button size="lg">Get full access</Button>
          </Link>
          <Link to="/freelancers/join">
            <Button variant="whiteOutlined" size="lg">
              Share your project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

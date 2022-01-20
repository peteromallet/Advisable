import React from "react";
import { Link, useParams } from "react-router-dom";

export default function NewAgreementIntroduction() {
  const { userId } = useParams();

  return (
    <>
      <h1>Introduction</h1>
      <Link to={`/new_agreement/${userId}/collaboration`}>Get started</Link>
    </>
  );
}

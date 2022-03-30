import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <h2>Welcome</h2>
      <Link to="/setup/company">Continue</Link>
    </div>
  );
}

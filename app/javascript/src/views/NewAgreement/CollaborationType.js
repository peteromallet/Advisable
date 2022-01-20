import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

export default function CollaborationType() {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useParams();
  const [collaborationType, setCollaborationType] = useState(
    location.state?.collaborationType || "",
  );

  const handleSubmit = () => {
    history.push(`/new_agreement/${userId}/invoicing`, { collaborationType });
  };

  return (
    <>
      <h1>Collaboration type</h1>
      <input
        id="fixed"
        type="radio"
        value="fixed"
        checked={collaborationType === "fixed"}
        onChange={(e) => setCollaborationType(e.target.value)}
      />
      <label htmlFor="fixed">Fixed</label>

      <input
        id="hourly"
        type="radio"
        value="hourly"
        checked={collaborationType === "hourly"}
        onChange={(e) => setCollaborationType(e.target.value)}
      />
      <label htmlFor="hourly">Hourly</label>

      <input
        id="flexible"
        type="radio"
        value="flexible"
        checked={collaborationType === "flexible"}
        onChange={(e) => setCollaborationType(e.target.value)}
      />
      <label htmlFor="flexible">Flexible</label>

      <button disabled={!collaborationType} onClick={handleSubmit}>
        Continue
      </button>
    </>
  );
}

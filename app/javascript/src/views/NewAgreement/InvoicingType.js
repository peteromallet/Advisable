import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

export default function InvoicingType() {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useParams();
  const [invoicingType, setInvoicingType] = useState("");

  const handleSubmit = () => {
    history.push(`/new_agreement/${userId}/confirm`, {
      ...location.state,
      invoicingType,
    });
  };

  return (
    <>
      <h1>Invoicing</h1>
      <input
        id="upfront"
        type="radio"
        value="upfront"
        checked={invoicingType === "upfront"}
        onChange={(e) => setInvoicingType(e.target.value)}
      />
      <label htmlFor="upfront">50% Up front</label>

      <input
        id="after"
        type="radio"
        value="after"
        checked={invoicingType === "after"}
        onChange={(e) => setInvoicingType(e.target.value)}
      />
      <label htmlFor="after">After completion</label>

      <input
        id="recurring"
        type="radio"
        value="recurring"
        checked={invoicingType === "recurring"}
        onChange={(e) => setInvoicingType(e.target.value)}
      />
      <label htmlFor="recurring">Recurring</label>

      <input
        id="flexible"
        type="radio"
        value="flexible"
        checked={invoicingType === "flexible"}
        onChange={(e) => setInvoicingType(e.target.value)}
      />
      <label htmlFor="flexible">Flexible</label>

      <button disabled={!invoicingType} onClick={handleSubmit}>
        Continue
      </button>
    </>
  );
}

import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCreateAgreement } from "./queries";

export default function ConfirmAgreement() {
  const { userId } = useParams();
  const location = useLocation();
  const [createAgreement] = useCreateAgreement();
  const [message, setMessage] = React.useState("");

  const handleSubmit = () => {
    createAgreement({
      variables: {
        input: {
          user: userId,
          collaboration: location.state.collaborationType,
          invoicing: location.state.invoicingType,
          message,
        },
      },
    });
  };

  return (
    <>
      <h1>Review and send</h1>
      <p>
        Please review and send your request. Once accepted you can begin working
        together.
      </p>
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit} disabled={!message}>
        Send request
      </button>
    </>
  );
}

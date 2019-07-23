import React from "react";
import { Redirect } from "react-router-dom";
import CardDetails from "./CardDetails";
import InvoiceSettings from "./InvoiceSettings";
import { Card } from "@advisable/donut";

const PaymentMethodDetails = props => {
  let methodType = props.values.paymentMethod;

  if (!methodType) {
    let url = `/manage/${props.match.params.applicationId}`;
    return <Redirect to={url} />;
  }

  return (
    <Card>
      {methodType === "Bank Transfer" ? (
        <InvoiceSettings {...props} />
      ) : (
        <CardDetails {...props} />
      )}
    </Card>
  );
};

export default PaymentMethodDetails;

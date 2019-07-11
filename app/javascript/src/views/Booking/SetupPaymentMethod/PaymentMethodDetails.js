import React from "react";
import { Redirect } from "react-router-dom";
import InvoiceSettings from './InvoiceSettings';
import { Card, Box, Text, Icon } from "@advisable/donut";

const PaymentMethodDetails = (props) => {
  let methodType = props.values.paymentMethod;

  if (!methodType) {
    let url = `/manage/${props.match.params.applicationId}`;
    return <Redirect to={url} />;
  }

  return <Card>
    {methodType === "Bank Transfer" && <InvoiceSettings {...props} />}
  </Card>;
};

export default PaymentMethodDetails;

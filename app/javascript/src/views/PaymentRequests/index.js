import React from "react";
import { Container, useBackground } from "@advisable/donut";
import { Route, Switch } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import FreelancerPaymentRequest from "./FreelancerPaymentRequest";
import FreelancerPaymentRequests from "./FreelancerPaymentRequests";
import ClientPaymentRequests from "./ClientPaymentRequests";
import ClientPaymentRequest from "./ClientPaymentRequest";
import NewPaymentRequest from "./NewPaymentRequest";

export default function PaymentRequests() {
  useBackground("white");
  const viewer = useViewer();

  return (
    <Container maxWidth="1080px" py={10}>
      <Switch>
        {viewer.isSpecialist && (
          <Route path="/payment_requests/new">
            <NewPaymentRequest />
          </Route>
        )}
        <Route path="/payment_requests/:id">
          {viewer.isSpecialist ? (
            <FreelancerPaymentRequest />
          ) : (
            <ClientPaymentRequest />
          )}
        </Route>
        <Route path="/payment_requests">
          {viewer.isSpecialist ? (
            <FreelancerPaymentRequests />
          ) : (
            <ClientPaymentRequests />
          )}
        </Route>
      </Switch>
    </Container>
  );
}

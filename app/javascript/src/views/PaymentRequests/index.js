import React from "react";
import { Container, useBackground } from "@advisable/donut";
import { Route, Switch } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import FreelancerPaymentRequest from "./FreelancerPaymentRequest";
import FreelancerPaymentRequests from "./FreelancerPaymentRequests";

export default function PaymentRequests() {
  useBackground("white");
  const viewer = useViewer();

  return (
    <Container maxWidth="1020px" py={10}>
      <Switch>
        <Route path="/payment_requests/:id">
          {viewer.isSpecialist ? (
            <FreelancerPaymentRequest />
          ) : (
            <>client payment request</>
          )}
        </Route>
        <Route path="/payment_requests">
          {viewer.isSpecialist ? (
            <FreelancerPaymentRequests />
          ) : (
            <div>client payment requests</div>
          )}
        </Route>
      </Switch>
    </Container>
  );
}

import React from "react";
import { Box, useBackground } from "@advisable/donut";
import { Route, Switch } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import FreelancerPaymentRequest from "./FreelancerPaymentRequest";
import FreelancerPaymentRequests from "./FreelancerPaymentRequests";
import ClientPaymentRequests from "./ClientPaymentRequests";
import ClientPaymentRequest from "./ClientPaymentRequest";
import NewPaymentRequest from "./NewPaymentRequest";
import Page from "src/components/Page";

export default function PaymentRequests() {
  useBackground("white");
  const viewer = useViewer();

  return (
    <Page maxWidth="1120px">
      <div className="pt-8 px-5">
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
      </div>
    </Page>
  );
}

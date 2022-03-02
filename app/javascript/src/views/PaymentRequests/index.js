import React from "react";
import { useBackground } from "@advisable/donut";
import { Route, Routes } from "react-router-dom";
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
        <Routes>
          {viewer.isSpecialist && (
            <Route path="new" element={<NewPaymentRequest />} />
          )}
          <Route
            path=":id"
            element={
              viewer.isSpecialist ? (
                <FreelancerPaymentRequest />
              ) : (
                <ClientPaymentRequest />
              )
            }
          />
          <Route
            path="/"
            element={
              viewer.isSpecialist ? (
                <FreelancerPaymentRequests />
              ) : (
                <ClientPaymentRequests />
              )
            }
          />
        </Routes>
      </div>
    </Page>
  );
}

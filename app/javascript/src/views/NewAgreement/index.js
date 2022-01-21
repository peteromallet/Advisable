import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Container, useBackground } from "src/../../../donut/src";
import { Loading } from "src/components";
import CollaborationType from "./CollaborationType";
import ConfirmAgreement from "./ConfirmAgreement";
import Introduction from "./Introduction";
import InvoicingType from "./InvoicingType";
import { useNewAgreement } from "./queries";
import NotFound, { isNotFound } from "src/views/NotFound";

export default function NewAgreement() {
  useBackground("white");
  const { userId } = useParams();
  const { data, loading, error } = useNewAgreement(userId);

  if (isNotFound(error)) return <NotFound />;
  if (loading) return <Loading />;

  return (
    <Container paddingY={10} maxWidth="1120px" paddingX={6}>
      <Routes>
        <Route exact path="/" element={<Introduction {...data} />} />
        <Route path="collaboration" element={<CollaborationType {...data} />} />
        <Route path="invoicing" element={<InvoicingType {...data} />} />
        <Route path="confirm" element={<ConfirmAgreement {...data} />} />
        <Route
          path="*"
          element={<Navigate to={`/new_agreement/${userId}`} />}
        />
      </Routes>
    </Container>
  );
}

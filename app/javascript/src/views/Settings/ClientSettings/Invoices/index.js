import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Invoice from "./Invoice";
import InvoicesList from "./InvoicesList";

export default function Invoices() {
  return (
    <Routes>
      <Route path="/:id" element={<Invoice />} />
      <Route path="/" element={<InvoicesList />} />
      <Route path="*" element={<Navigate to="/settings/invoices" />} />
    </Routes>
  );
}

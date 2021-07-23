import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Invoice from "./Invoice";
import InvoicesList from "./InvoicesList";

export default function Invoices() {
  return (
    <Switch>
      <Route path="/settings/invoices/:id" component={Invoice} />
      <Route path="/settings/invoices" component={InvoicesList} />
      <Redirect to="/settings/invoices" />
    </Switch>
  );
}

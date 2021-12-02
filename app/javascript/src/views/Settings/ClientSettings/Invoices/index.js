import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Invoice from "./Invoice";
import InvoicesList from "./InvoicesList";

export default function Invoices() {
  return (
    <Switch>
      <Route path="/settings/invoices/:id">
        <Invoice />
      </Route>
      <Route path="/settings/invoices">
        <InvoicesList />
      </Route>
      <Route>
        <Redirect to="/settings/invoices" />
      </Route>
    </Switch>
  );
}

import React from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import CollaborationType from "./CollaborationType";
import ConfirmAgreement from "./ConfirmAgreement";
import Introduction from "./Introduction";
import InvoicingType from "./InvoicingType";

export default function NewAgreement() {
  const { userId } = useParams();

  return (
    <Switch>
      <Route exact path="/new_agreement/:userId" component={Introduction} />
      <Route path="/new_agreement/:userId/collaboration">
        <CollaborationType />
      </Route>
      <Route path="/new_agreement/:userId/invoicing">
        <InvoicingType />
      </Route>
      <Route path="/new_agreement/:userId/confirm">
        <ConfirmAgreement />
      </Route>
      <Route path="*">
        <Redirect to={`/new_agreement/${userId}`} />
      </Route>
    </Switch>
  );
}

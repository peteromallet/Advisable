import React from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { useBackground } from "src/../../../donut/src";
import { Loading } from "src/components";
import CollaborationType from "./CollaborationType";
import ConfirmAgreement from "./ConfirmAgreement";
import Introduction from "./Introduction";
import InvoicingType from "./InvoicingType";
import { useNewAgreement } from "./queries";

export default function NewAgreement() {
  useBackground("white");
  const { userId } = useParams();
  const { data, loading } = useNewAgreement(userId);

  if (loading) return <Loading />;

  return (
    <Switch>
      <Route exact path="/new_agreement/:userId">
        <Introduction {...data} />
      </Route>
      <Route path="/new_agreement/:userId/collaboration">
        <CollaborationType {...data} />
      </Route>
      <Route path="/new_agreement/:userId/invoicing">
        <InvoicingType {...data} />
      </Route>
      <Route path="/new_agreement/:userId/confirm">
        <ConfirmAgreement {...data} />
      </Route>
      <Route path="*">
        <Redirect to={`/new_agreement/${userId}`} />
      </Route>
    </Switch>
  );
}

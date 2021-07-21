import React from "react";
import { gql, useSubscription } from "@apollo/client";

const SUBSCRIPTION = gql`
  subscription MessageReceived {
    receivedMessage {
      conversation {
        id
      }
      message {
        id
      }
    }
  }
`;

export default function SubscriptionTest() {
  const result = useSubscription(SUBSCRIPTION);
  console.log(result);
  return <div>sub</div>;
}

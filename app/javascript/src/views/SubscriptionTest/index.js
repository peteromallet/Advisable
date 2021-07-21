import React from "react";
import { gql, useSubscription } from "@apollo/client";

const SUBSCRIPTION = gql`
  subscription MessageReceived {
    receivedMessage {
      message {
        id
        author {
          name
        }
        content
      }
    }
  }
`;

export default function SubscriptionTest() {
  const result = useSubscription(SUBSCRIPTION);
  console.log(result);
  return <div>sub</div>;
}

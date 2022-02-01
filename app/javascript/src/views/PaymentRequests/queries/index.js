import PAYMENT_REQUEST from "./paymentRequest.gql";
import PAYMENT_REQUESTS from "./paymentRequests.gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export function usePaymentRequests() {
  return useQuery(PAYMENT_REQUESTS);
}

export function usePaymentRequest() {
  const { id } = useParams();
  return useQuery(PAYMENT_REQUEST, {
    variables: { id },
  });
}

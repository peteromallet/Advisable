import PAYMENT_REQUEST from "./paymentRequest.gql";
import CLIENT_PAYMENT_REQUESTS from "./clientPaymentRequests.gql";
import FREELANCER_PAYMENT_REQUESTS from "./freelancerPaymentRequests.gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export function useFreelancerPaymentRequests() {
  return useQuery(FREELANCER_PAYMENT_REQUESTS);
}

export function useClientPaymentRequests() {
  return useQuery(CLIENT_PAYMENT_REQUESTS);
}

export function usePaymentRequest() {
  const { id } = useParams();
  return useQuery(PAYMENT_REQUEST, {
    variables: { id },
  });
}

import APPROVE from "./approvePaymentRequest.gql";
import PAYMENT_REQUEST from "./paymentRequest.gql";
import ACCEPTED_AGREEMENTS from "./acceptedAgreements.gql";
import CREATE_PAYMENT_REQUEST from "./createPaymentRequest.gql";
import CLIENT_PAYMENT_REQUESTS from "./clientPaymentRequests.gql";
import FREELANCER_PAYMENT_REQUESTS from "./freelancerPaymentRequests.gql";
import PAYMENT_REQUEST_FIELDS from "./paymentRequestFields.gql";
import DISPUTE_PAYMENT_REQUEST from "./disputePaymentRequest.gql";
import { useMutation, useQuery } from "@apollo/client";
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

export function useApprovePaymentRequest() {
  return useMutation(APPROVE);
}

export function useAcceptedAgreements() {
  return useQuery(ACCEPTED_AGREEMENTS);
}

export function useCreatePaymentRequest() {
  return useMutation(CREATE_PAYMENT_REQUEST, {
    update(cache, { data }) {
      const { paymentRequest } = data.createPaymentRequest;

      cache.modify({
        fields: {
          paymentRequests: (existing, { readField }) => {
            const newRef = cache.writeFragment({
              data: paymentRequest,
              fragment: PAYMENT_REQUEST_FIELDS,
            });

            if (
              existing.edges.some((ref) => {
                return readField("id", ref) === paymentRequest.id;
              })
            ) {
              return existing;
            }

            return {
              ...existing,
              edges: [newRef, ...existing.edges],
            };
          },
        },
      });
    },
  });
}

export function useDisputePaymentRequest() {
  return useMutation(DISPUTE_PAYMENT_REQUEST);
}

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import PAYMENT from "./payment.gql";

export function usePayment() {
  const { id } = useParams();
  return useQuery(PAYMENT, { variables: { id } });
}

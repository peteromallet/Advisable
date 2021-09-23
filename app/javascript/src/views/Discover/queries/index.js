import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import SHORTLIST from "./shortlist.gql";

export function useShortlist() {
  const { id } = useParams();
  return useQuery(SHORTLIST, { variables: { id } });
}

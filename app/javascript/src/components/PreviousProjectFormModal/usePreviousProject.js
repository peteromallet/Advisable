import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_PREVIOUS_PROJECT } from "./queries";

export default function usePreviousProject(opts = {}) {
  const { id } = useParams();
  return useQuery(GET_PREVIOUS_PROJECT, { ...opts, variables: { id } });
}

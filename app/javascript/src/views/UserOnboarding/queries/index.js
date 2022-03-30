import UPDATE_COMPANY from "./updateCompany.gql";
import { useMutation } from "@apollo/client";

export const useUpdateCopmany = () => {
  return useMutation(UPDATE_COMPANY);
};

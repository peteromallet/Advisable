import { useQuery } from "@apollo/client";
import { CURRENT_VARIANT } from "./index";

function useVariants() {
  const { data } = useQuery(CURRENT_VARIANT);
  return {
    variant: data?.variant,
    numOfVariants: data?.numOfVariants,
  };
}

export default useVariants;

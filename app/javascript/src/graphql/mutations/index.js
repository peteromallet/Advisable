import { useMutation } from "@apollo/client";
import { resetAnalytics } from "src/utilities/segment";
import LOGOUT from './logout.gql'

export function useLogout() {
  const [mutate] = useMutation(LOGOUT);

  const logout = async () => {
    resetAnalytics();
    await mutate();
    window.location = "/login"
  }

  return logout
}

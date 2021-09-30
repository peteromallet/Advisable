import { useQuery, useMutation } from "@apollo/client";
import NOTIFICATIONS from "./notifications.gql";
import UPDATE_LAST_READ from "./updateLastRead.gql";

export function useNotifications() {
  return useQuery(NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
  });
}

export function useUpdateLastRead() {
  return useMutation(UPDATE_LAST_READ);
}

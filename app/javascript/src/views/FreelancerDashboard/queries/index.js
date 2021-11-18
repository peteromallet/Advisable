import { useQuery } from "@apollo/client";
import GET_DASHBOARD_DATA from "./dashboardData.gql";
import GET_COLLABORATION_REQUESTS from "./collaborationRequests.gql";

export const useDashboardData = () => {
  return useQuery(GET_DASHBOARD_DATA);
};

export const useCollaborationRequests = () => {
  return useQuery(GET_COLLABORATION_REQUESTS, {
    notifyOnNetworkStatusChange: true,
  });
};

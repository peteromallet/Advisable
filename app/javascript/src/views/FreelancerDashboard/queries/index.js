import { useQuery } from "@apollo/client";
import GET_DASHBOARD_DATA from "./dashboardData.gql";

export const useDashboardData = () => {
  return useQuery(GET_DASHBOARD_DATA);
};

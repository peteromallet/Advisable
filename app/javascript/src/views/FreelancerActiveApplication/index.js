// Renders the view for when a freelancer is viewing an application with a
// status of "Working".
import { get } from "lodash-es";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import NotFound from "../NotFound";
import ActiveApplication from "./ActiveApplication";
import FETCH_APPLICATION from "./fetchApplication";

const Component = (props) => {
  const id = props.match.params.applicationId;
  const query = useQuery(FETCH_APPLICATION, { variables: { id } });

  if (query.loading) return <Loading />;
  if (!query.loading && !get(query, "data.application")) {
    return <NotFound />;
  }
  return <ActiveApplication {...query} {...props} />;
};

export default Component;

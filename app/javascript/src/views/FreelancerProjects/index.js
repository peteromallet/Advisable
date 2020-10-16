import { get } from "lodash-es";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";
import ActiveApplications from "./ActiveApplications";

const FreelancerProjects = ({ history }) => {
  const { loading, data } = useQuery(FETCH_DATA);

  const handleClick = (application) => {
    history.push(`/clients/${application.airtableId}`);
  };

  const applications = get(data, "viewer.applications") || [];

  return (
    <Layout>
      <Layout.Main>
        {loading && <Loading />}
        {!loading && (
          <ActiveApplications
            onClick={handleClick}
            applications={applications}
          />
        )}
      </Layout.Main>
    </Layout>
  );
};

export default FreelancerProjects;

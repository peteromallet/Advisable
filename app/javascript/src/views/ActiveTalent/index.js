import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Container } from "@advisable/donut";
import Manage from "./Manage";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";

const ActiveTalent = () => {
  const history = useHistory();
  const { data, loading } = useQuery(FETCH_DATA);

  const handleClick = (application) => {
    history.push(`/manage/${application.airtableId}`);
  };

  return (
    <Container mt="xl">
      {loading ? (
        <Loading />
      ) : (
        <Manage onClick={handleClick} applications={data.viewer.applications} />
      )}
    </Container>
  );
};

export default ActiveTalent;

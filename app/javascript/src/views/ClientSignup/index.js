import React from "react";
import queryString from "query-string";
import { useQuery } from "react-apollo";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import GET_DATA from "./getData";
import Criteria from "./Criteria";
import Searching from "./Searching";

const ClientSignup = () => {
  const location = useLocation();
  const { loading, data } = useQuery(GET_DATA);

  if (loading) {
    return <Loading />;
  }

  const { skill } = queryString.parse(location.search);

  if (skill) {
    return <Searching />;
  }

  return <Criteria {...data} />;
};

export default ClientSignup;

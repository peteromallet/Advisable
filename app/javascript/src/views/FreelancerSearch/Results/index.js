import React from "react";
import { useQuery } from "react-apollo";
import { useLocation, useHistory } from "react-router-dom";
import Loading from "./Loading";
import QUERY from "./searchQuery";
import NoResults from "./NoResults";
import Freelancers from "./Freelancers";

const Results = () => {
  const history = useHistory();
  const location = useLocation();
  const search = location.state?.search;

  const { data, loading, error } = useQuery(QUERY, {
    skip: Boolean(!search),
    variables: {
      skill: search?.skill,
      industry: search?.industryRequired ? search?.industry : null,
      companyType: search?.companyTypeRequired ? search?.companyType : null,
    },
  });

  if (!location.state?.search) {
    history.replace("/freelancer_search");
  }

  if (error) {
    return <>something went wrong</>;
  }

  if (loading) return <Loading />;

  if (data.specialists.nodes.length === 0) {
    return <NoResults />;
  }

  return <Freelancers data={data} />;
};

export default Results;

import React from "react";
import { useLocation } from "react-router-dom";
import Searching from "./Searching";
import CriteriaForm from "./CriteriaForm";

const Criteria = () => {
  const location = useLocation();
  const [search, setSearch] = React.useState(null);

  if (search) {
    return <Searching queryParams={location.search} search={search} />;
  }

  return <CriteriaForm onSubmit={setSearch} />;
};

export default Criteria;

import React from "react";
import { Query } from "react-apollo";
import Select from "src/components/Select";
import COUNTRIES from "./countries.graphql";

export default props => (
  <Query query={COUNTRIES}>
    {query => {
      const countries = (query.data.countries || []).map(c => {
        return c.name
      })

      return <Select {...props} options={countries} />;
    }}
  </Query>
);

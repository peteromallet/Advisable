import React, { useMemo } from "react";
import { gql, useMutation } from "@apollo/client";
import { Download } from "@styled-icons/heroicons-solid";
import HeaderButton from "../../components/HeaderButton";

const GET_CSV = gql`
  mutation GetCSV(
    $resource: String!
    $sortBy: String
    $sortOrder: String
    $filters: [FilterInput!]
  ) {
    getCsv(
      resource: $resource
      sortBy: $sortBy
      sortOrder: $sortOrder
      filters: $filters
    ) {
      csv {
        content
      }
    }
  }
`;

export default function DownloadCSV({ resource, filters, sortBy, sortOrder }) {
  const [generate, { loading }] = useMutation(GET_CSV);

  const allFiltersHaveValues = useMemo(() => {
    if (filters.length === 0) return false;
    return filters.every((f) => {
      return f.value.length > 0 && f.value[0] !== "";
    });
  }, [filters]);

  const handleClick = async () => {
    const response = await generate({
      variables: {
        resource: resource.type,
        sortBy,
        sortOrder,
        filters: filters,
      },
    });

    const a = document.createElement("a");
    a.href = "data:csv;base64," + response.data.getCsv.csv.content;
    a.download = "toby.csv";
    a.click();
  };

  return (
    <HeaderButton
      icon={Download}
      onClick={handleClick}
      disabled={loading || !allFiltersHaveValues}
    >
      Download CSV
    </HeaderButton>
  );
}

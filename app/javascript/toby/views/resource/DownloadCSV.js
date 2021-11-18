import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
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
  const { error } = useNotifications();
  const [generate, { loading }] = useMutation(GET_CSV);

  const handleClick = async () => {
    const response = await generate({
      variables: {
        resource: resource.type,
        sortBy,
        sortOrder,
        filters: filters,
      },
    });

    if (response.errors) {
      error("Failed to generate CSV");
      return;
    }

    const a = document.createElement("a");
    a.href = "data:csv;base64," + response.data.getCsv.csv.content;
    a.download = "toby.csv";
    a.click();
  };

  return (
    <HeaderButton icon={Download} onClick={handleClick} disabled={loading}>
      Download CSV
    </HeaderButton>
  );
}

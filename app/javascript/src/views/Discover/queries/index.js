import { useApolloClient, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import SHORTLIST from "./shortlist.gql";
import SHORTLISTS from "./shortlists.gql";

export function useShortlist() {
  const { id } = useParams();
  return useQuery(SHORTLIST, { variables: { id } });
}

export function useShortlists() {
  return useQuery(SHORTLISTS);
}

export function useArchiveArticle(article) {
  const client = useApolloClient();

  const handler = () => {
    client.cache.modify({
      id: "CaseStudySearch:csr_MP74ibrVBsNcfot",
      fields: {
        results(previous, { readField }) {
          return {
            ...previous,
            nodes: previous.nodes.filter((node) => {
              return article.id !== readField("id", node);
            }),
          };
        },
      },
    });
  };

  return [handler];
}

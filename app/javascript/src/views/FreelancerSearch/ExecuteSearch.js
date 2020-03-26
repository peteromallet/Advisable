import React from "react";
import { useMutation } from "react-apollo";
import { Box, Skeleton } from "@advisable/donut";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { useNotifications } from "../../components/Notifications";
import {
  createSearch as CREATE_SEARCH,
  getSearch as GET_SEARCH,
} from "./searchQueries";

export default function ExecuteSearch() {
  const history = useHistory();
  const location = useLocation();
  const notifications = useNotifications();
  const [createSearch] = useMutation(CREATE_SEARCH, {
    update(store, result) {
      const search = result.data.createSearch.search;
      store.writeQuery({
        query: GET_SEARCH,
        variables: {
          id: search.id,
        },
        data: {
          search,
        },
      });
    },
  });

  const search = location.state?.search;

  if (!search) {
    return <Redirect to="/freelancer_search" />;
  }

  React.useEffect(() => {
    const executeSearch = async () => {
      const response = await createSearch({
        variables: {
          input: search,
        },
      });

      const errors = response.errors || [];

      if (errors.length > 0) {
        notifications.notify("Something went wrong, please try again.");
        history.push("/freelancer_search");
      } else {
        const id = response.data?.createSearch.search.id;
        history.push(`/freelancer_search/${id}`);
      }
    };

    executeSearch();
  }, []);

  return (
    <div>
      <Skeleton height={32} maxWidth="50%" mb="s" />
      <Skeleton height={18} maxWidth="70%" mb="xl" />
      <Box
        display="grid"
        gridGap="20px"
        gridTemplateColumns={{ _: "1fr", m: "1fr 1fr", l: "1fr 1fr 1fr" }}
      >
        <Skeleton height={350} />
        <Skeleton height={350} />
        <Skeleton height={350} />
        <Skeleton height={350} />
        <Skeleton height={350} />
      </Box>
    </div>
  );
}

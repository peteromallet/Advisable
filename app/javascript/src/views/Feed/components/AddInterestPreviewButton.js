import queryString from "query-string";
import React, { useMemo } from "react";
import Button from "src/components/Button";
import { Check, PlusSm } from "@styled-icons/heroicons-solid";
import {
  useCreateInterests,
  useDeleteInterest,
  useInterests,
} from "../queries";
import { useLocation } from "react-router-dom";

export default function AddInterestPreviewButton() {
  const location = useLocation();
  const { data: interestsData } = useInterests();
  const [createInterests, createInterestsState] = useCreateInterests();

  const query = useMemo(() => {
    const { search } = location?.state?.backgroundLocation || location;
    return queryString.parse(search);
  }, [location]);

  const subscribedInterest = useMemo(() => {
    const interests = interestsData?.interests || [];
    return interests.find(
      (i) => i.term.toLowerCase() === query.q.toLowerCase(),
    );
  }, [interestsData, query]);

  const [removeInterest, removeInterestState] =
    useDeleteInterest(subscribedInterest);

  if (!interestsData) return null;
  const loading = createInterestsState.loading || removeInterestState.loading;

  const handleClick = async () => {
    if (subscribedInterest) {
      await removeInterest();
    } else {
      await createInterests({
        variables: {
          input: {
            terms: [query.q],
          },
        },
      });
    }
  };

  return (
    <Button
      disabled={loading}
      loading={loading}
      onClick={handleClick}
      variant="outlined"
      prefix={subscribedInterest ? <Check /> : <PlusSm />}
    >
      {subscribedInterest ? "Added" : "Add to interests"}
    </Button>
  );
}

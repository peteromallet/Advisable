import React, { useMemo } from "react";
import Button from "src/components/Button";
import { Check, PlusSm } from "@styled-icons/heroicons-solid";
import {
  useCreateInterests,
  useDeleteInterest,
  useInterests,
} from "../queries";
import { useSearchParams } from "react-router-dom";

export default function AddInterestPreviewButton() {
  const [searchParams] = useSearchParams();
  const { data: interestsData } = useInterests();
  const [createInterests, createInterestsState] = useCreateInterests();

  const subscribedInterest = useMemo(() => {
    const interests = interestsData?.interests || [];
    return interests.find(
      (i) => i.term.toLowerCase() === searchParams.get("q").toLowerCase(),
    );
  }, [interestsData, searchParams]);

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
            terms: [searchParams.get("q")],
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
      {subscribedInterest ? "Subscribed" : "Add to interests"}
    </Button>
  );
}

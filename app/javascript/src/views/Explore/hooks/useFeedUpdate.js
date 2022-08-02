import { useApolloClient } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { useFeedUpdatedSubscription } from "../queries";

const TIMEOUT = 5000

// We can't just simply update the feed when the user updates their interests
// due to how we find results for an interest in a background task. Instead we
// need to wait for the API to trigger a 'feedUpdated' subscription event which
// tells us that new results are ready and the feed can be updated. We also
// include a 5 second timer here so that the user isn't waiting too long, or if
// there is an issue with the websocket connection.
export default function useFeedUpdate() {
  const apollo = useApolloClient();
  const [pendingRefresh, setPending] = useState(false);

  // By evicting the cache we force the feed to be refreshed
  const refreshFeed = useCallback(() => {
    apollo.cache.evict({ id: "ROOT_QUERY", fieldName: "feed" })
    apollo.cache.gc();
    setPending(false);
  }, [apollo])

  useFeedUpdatedSubscription(() => {
    if (!pendingRefresh) return;
    refreshFeed();
  })

  useEffect(() => {
    let timer

    if (pendingRefresh) {
      timer = setTimeout(refreshFeed, TIMEOUT)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [pendingRefresh, refreshFeed])

  const awaitFeedUpate = () => {
    setPending(true);
  }

  return { pendingRefresh, refreshFeed, awaitFeedUpate }
}

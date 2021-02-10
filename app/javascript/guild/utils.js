import dayjs from "dayjs";
import { DateTime } from "luxon";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const lowerDashed = (str) => str.replace(/\s+/g, "-").toLowerCase();

export const getUrlParams = (search) => {
  const query = new URLSearchParams(search);
  return Object.fromEntries(query.entries());
};

export const omit = (obj, ...omit) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !omit.includes(key)),
  );

export function timestamp(date) {
  const asLuxon = DateTime.fromJSDate(date);
  return asLuxon.toFormat("dd LLL");
}

export const relativeDate = (date) => dayjs().from(date, true);

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/*
    https://www.apollographql.com/docs/react/data/pagination/#cursor-based
    https://graphql-ruby.org/pagination/using_connections.html
  */
export const cursorLoadMore = ({ fetchMore, collectionKey, data }) => {
  if (!data?.[collectionKey]?.nodes) return;
  const collection = data[collectionKey];

  fetchMore({
    variables: {
      cursor: collection?.pageInfo.endCursor,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newNodes = fetchMoreResult[collectionKey].nodes;
      const { pageInfo, guildTopic } = fetchMoreResult[collectionKey];

      return newNodes.length
        ? {
            [collectionKey]: {
              __typename: previousResult[collectionKey].__typename,
              nodes: [...previousResult[collectionKey].nodes, ...newNodes],
              pageInfo,
              guildTopic,
            },
          }
        : previousResult;
    },
  });
};

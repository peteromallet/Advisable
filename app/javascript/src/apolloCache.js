import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

// Apollo 3 introduced the concept of field policies. This is to ensure cached
// data is updated correctly. For the project characteristics, we use an
// array of strings. We want to tell apollo that we can replace the entire
// array rather than doing any kind of merge.
const replaceArrayMerge = (_, incoming) => incoming;

// see https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
const combineValues = (existing, incoming) => {
  if (!incoming) return existing || null;
  if (!existing) return incoming;
  return { ...existing, ...incoming };
};

const createCache = () => {
  return new InMemoryCache({
    possibleTypes: {
      MessageInterface: ["UserMessage", "SystemMessage", "GuildPostMessage"],
      ViewerUnion: ["User", "Specialist"],
      PostInterface: [
        "GuildPostAdviceRequired",
        "GuildPostCaseStudy",
        "GuildPostGeneral",
        "GuildPostOpportunity",
      ],
    },
    typePolicies: {
      Query: {
        fields: {
          // https://www.apollographql.com/docs/react/pagination/key-args/
          guildPosts: relayStylePagination(["type"]),
          events: relayStylePagination(),
          labelPosts: relayStylePagination(),
          savedArticles: relayStylePagination(),
          archivedArticles: relayStylePagination(),
          postPrompt(_, { args, toReference }) {
            return toReference({
              __typename: "PostPrompt",
              id: args.id,
            });
          },
        },
      },
      Conversation: {
        fields: {
          messages: relayStylePagination(),
        },
      },
      UserMessage: {
        fields: {
          status(existing) {
            if (existing === undefined) return "SENT";
            return existing;
          },
        },
      },
      Specialist: {
        fields: {
          guildPosts: relayStylePagination(),
          previousProjects: relayStylePagination(),
        },
      },
      SkillCategory: {
        fields: {
          articles: relayStylePagination(),
        },
      },
      ClientApplication: {
        fields: {
          skills: {
            merge: replaceArrayMerge,
          },
        },
      },
      PreviousProject: {
        fields: {
          skills: {
            merge: replaceArrayMerge,
          },
        },
      },
      Application: {
        fields: {
          tasks: {
            merge: replaceArrayMerge,
          },
        },
      },
      // CaseStudySearch: {
      //   fields: {

      //   }
      // },
      Project: {
        fields: {
          deposit: {
            merge: combineValues,
          },
          applications: {
            merge: replaceArrayMerge,
          },
          characteristics: {
            merge: replaceArrayMerge,
          },
          optionalCharacteristics: {
            merge: replaceArrayMerge,
          },
          requiredCharacteristics: {
            merge: replaceArrayMerge,
          },
        },
      },
    },
  });
};

export default createCache;

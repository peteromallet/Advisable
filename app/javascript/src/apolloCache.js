import { InMemoryCache } from "@apollo/client";

// Apollo 3 introduced the concept of field policies. This is to ensure cached
// data is updated correctly. For the project characteristics, we use an
// array of strings. We want to tell apollo that we can replace the entire
// array rather than doing any kind of merge.
const replaceArrayMerge = (_, incoming) => incoming;

const createCache = () => {
  return new InMemoryCache({
    possibleTypes: {
      ViewerUnion: ["User", "Specialist"],
      PostInterface: [
        "GuildPostAdviceRequired",
        "GuildPostCaseStudy",
        "GuildPostGeneral",
        "GuildPostOpportunity",
      ],
    },
    typePolicies: {
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
      Project: {
        fields: {
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

import { merge, uniqueId } from "lodash";

export const user = (fields = {}) => {
  return merge(
    {
      __typename: "User",
      id: uniqueId("user"),
    },
    fields
  );
};

export const country = (fields = {}) => {
  return merge(
    {
      __typename: "Country",
      id: uniqueId("country"),
      name: "Ireland",
    },
    fields
  );
};

export const project = (fields = {}) => {
  return merge(
    {
      __typename: "Project",
      id: uniqueId("project"),
      airtableId: uniqueId("rec"),
      name: "Project",
      currency: "USD",
      questions: ["Question?"],
      applicationsOpen: true,
      primarySkill: "Testing",
      description: "desription",
      companyDescription: "company description",
      specialistDescription: "specialist description",
      goals: ["This is a goal"],
      requiredCharacteristics: ["Required characteristic"],
      optionalCharacteristics: ["Optional characteristic"],
      estimatedBudget: "€10,000",
      remote: true,
    },
    fields
  );
};

export const application = (fields = {}) => {
  return merge(
    {
      __typename: "Application",
      id: uniqueId("application"),
      rate: "75",
      status: "Working",
      airtableId: uniqueId("rec"),
      referralUrl: "https://advisable.com",
      introduction: "Application Introduction",
      availability: "2 - 4 Weeks",
      acceptsFee: true,
      acceptsTerms: true,
      questions: [
        {
          __typename: "ApplicationQuestion",
          question: "This is a question?",
          answer: "This is the answer",
        },
      ],
      previousProjects: [],
    },
    fields
  );
};

export const specialist = (fields = {}) => {
  return merge(
    {
      __typename: "Specialist",
      id: uniqueId("specialist"),
      bio: "Specialist bio",
      airtableId: uniqueId("rec"),
      previousProjects: [],
    },
    fields
  );
};

export default {
  user,
  country,
  project,
  application,
  specialist,
};

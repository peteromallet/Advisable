import { merge, uniqueId } from "lodash";

export const user = (fields = {}) => {
  return merge(
    {
      __typename: "User",
      id: uniqueId("user"),
      firstName: "Test",
      lastName: "Account",
      name: "Test Account",
      email: "test@test.com",
      airtableId: "airtableid",
      confirmed: true,
      companyName: "Test Corp",
      createdAt: new Date().toISOString(),
      country: {
        __typename: "Country",
        id: 1,
        name: "Ireland",
      },
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
      applicationCount: 0,
      status: "Brief Confirmed",
      clientReferralUrl: "https://advisable.com",
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
      airtableId: uniqueId("rec"),
      rate: "75",
      status: "Working",
      featured: false,
      comment: "comment",
      hidden: false,
      referencesRequested: false,
      referralUrl: "https//advisable.com",
      introduction: "Application Introduction",
      availability: "2 - 4 Weeks",
      acceptsFee: true,
      acceptsTerms: true,
      proposal: null,
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
      name: "Test Specialist",
      firstName: "Test",
      city: "Dublin",
      reviewsCount: 0,
      ratings: {
        __typename: "Ratings",
        overall: 5.0,
      },
      image: null,
      country: {
        __typename: "Country",
        id: 1,
        name: "Ireland",
      },
      linkedin: "https://linkedin.com",
      previousProjects: [],
      skills: ["Testing"],
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

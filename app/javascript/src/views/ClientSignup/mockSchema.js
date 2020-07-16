import { sum } from "lodash-es";
import { GraphQLError } from "graphql";
import gql from "graphql-tag";

const generateID = () => String(Math.random().toString(36).substr(2, 9));

const firstClient = {
  id: "1",
  firstName: "Yurko",
  lastName: "Turskiy",
  email: "guandjoy@gmail.com",
  __typename: "clientApplication",
};

const secondClient = {
  id: "2",
  firstName: "Elon",
  lastName: "Tusk",
  email: "elontusk@gmail.com",
  companyName: "Tesla",
  __typename: "clientApplication",
};
const SIGNED_EMAIL = "iamavaliduser@gmail.com";
const clientApplications = [firstClient, secondClient];

export const defaults = {
  hello: "world",
  clientApplications,
};

export const GET_CLIENT_APPLICATIONS = gql`
  query ClientApplications {
    clientApplications @client {
      id
      firstName
      lastName
      email
    }
  }
`;

export const typeDefs = gql`
  type ClientApplication {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    companyName: String
    industry: Industry
    companyType: String
    skills: [Skill]
    numOfHire: [Number]
    budget: Int
    remoteFriendly: Int
    provideFeedback: Boolean
    talentQuality: String
    status: String!
    rejectionReason: String
  }

  input StartClientApplicationInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  type StartClientApplicationPayload {
    clientApplication: ClientApplication
  }

  input UpdateClientApplicationInput {
    id: ID!
    companyName: String
    industry: String
    companyType: String
    skills: [String]
    numOfHire: [Number]
    budget: Int
    remoteFriendly: Int
    provideFeedback: Boolean
    talentQuality: String
  }

  type UpdateClientApplicationPayload {
    clientApplication: ClientApplication
  }

  input SubmitClientApplicationInput {
    id: ID!
    companyName: String
    industry: String
    companyType: String
    skills: [String]
    numOfHire: [Number]
    budget: Int
    remoteFriendly: Int
    provideFeedback: Boolean
    talentQuality: String
  }

  type SubmitClientApplicationPayload {
    clientApplication: ClientApplication
  }

  extend type Query {
    hello: String
    man: [Man]
    clientApplication(id: ID!): ClientApplication
    clientApplications: [ClientApplication]
  }

  extend type Mutation {
    startClientApplication(
      input: StartClientApplicationInput!
    ): ClientApplication
    updateClientApplication(
      input: UpdateClientApplicationInput!
    ): UpdateClientApplicationPayload
    submitClientApplication(
      input: SubmitClientApplicationInput!
    ): SubmitClientApplicationPayload
  }
`;

export const resolvers = {
  Query: {
    clientApplication: (_, input, { cache }) => {
      const query = gql`
        query {
          clientApplications @client {
            id
            lastName
            firstName
            email
          }
        }
      `;
      const { clientApplications } = cache.readQuery({ query });
      const result = clientApplications.find((item) => item.id === input.id);
      if (!result) throw new GraphQLError("Application not found", "NOT_FOUND");
      return result;
    },
  },
  Mutation: {
    startClientApplication: (_, { input }, { cache }) => {
      if (input.email === SIGNED_EMAIL)
        return new GraphQLError("You already signed up. Please login instead");
      const { clientApplications } = cache.readQuery({
        query: GET_CLIENT_APPLICATIONS,
      });
      // Check if application with the same email exists
      const existedApplication = clientApplications.find(
        (item) => item.email === input.email,
      );
      if (existedApplication) return existedApplication;
      // Create new one if not exists
      const newApplication = {
        id: generateID(),
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        __typename: "clientApplication",
      };
      cache.writeData({
        data: {
          clientApplications: [...clientApplications, newApplication],
        },
      });
      return newApplication;
    },
    updateClientApplication: (_, { input }, { cache }) => {
      // Used to update the client application throughout the signup process
      const { clientApplications } = cache.readQuery({
        query: GET_CLIENT_APPLICATIONS,
      });
      const index = clientApplications.findIndex(
        (item) => item.id === input.id,
      );
      const updatedClientApplications = clientApplications.concat();
      updatedClientApplications[index] = {
        ...updatedClientApplications[index],
        ...input,
      };
      cache.writeData({
        data: { clientApplications: [...updatedClientApplications] },
      });
      return updatedClientApplications[index];
    },
    submitClientApplication: (_, { input }, { cache }) => {
      // Used to finalise a client's application
      const { clientApplications } = cache.readQuery({
        query: GET_CLIENT_APPLICATIONS,
      });
      const index = clientApplications.findIndex(
        (item) => item.id === input.id,
      );
      const updatedClientApplications = clientApplications.concat();
      const notHiring = !sum(input.numOfHire);
      const cheapTalent =
        input.talentQuality === "CHEAP" || input.talentQuality === "BUDGET";
      const reject = notHiring || cheapTalent;
      const status = reject ? "REJECTED" : "ACCEPTED";
      const rejectionReason =
        (notHiring && "NOT_HIRING") || (cheapTalent && "CHEAP_TALENT");
      updatedClientApplications[index] = {
        ...updatedClientApplications[index],
        status,
        rejectionReason,
      };
      cache.writeData({
        data: { clientApplications: [...updatedClientApplications] },
      });
      return updatedClientApplications[index];
    },
  },
};

export default { defaults, typeDefs, resolvers };

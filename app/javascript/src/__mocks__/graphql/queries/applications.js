import { merge, uniqueId } from "lodash";
import {
  getActiveApplication as GET_ACTIVE_APPLICATIONS,
  getApplicationInvitation as GET_APPLICATION_INVITATION,
} from "../../../graphql/queries/applications";

export const getActiveApplication = config =>
  merge(
    {
      request: {
        query: GET_ACTIVE_APPLICATIONS,
      },
      result: {
        data: {
          application: {
            __typename: "Application",
            id: uniqueId("application"),
            rate: "75",
            status: "Working",
            airtableId: uniqueId("rec_"),
            tasks: [
              {
                __typename: "Task",
                id: uniqueId("task"),
                name: "Test task",
                stage: "Not Assigned",
                dueDate: null,
                estimate: null,
                repeat: null,
                flexibleEstimate: null,
                description: "This is the task description",
                createdAt: new Date().toISOString(),
              },
            ],
            project: {
              __typename: "Project",
              id: uniqueId("project"),
              currency: "USD",
              primarySkill: "Testing",
              user: {
                __typename: "User",
                id: uniqueId("user"),
                companyName: "Test Inc",
              },
            },
            specialist: {
              __typename: "Specialist",
              id: uniqueId("specialist"),
              name: "Test Specialist",
              firstName: "Test",
              lastName: "Specialist",
              city: "Dublin",
              image: null,
              country: {
                __typename: "Country",
                id: uniqueId("country"),
                name: "Ireland",
              },
            },
          },
        },
      },
    },
    config
  );

export const getApplicationInvitation = config =>
  merge(
    {
      request: {
        query: GET_ACTIVE_APPLICATIONS,
      },
      result: {
        data: {
          application: {
            __typename: "Application",
            id: uniqueId("application"),
            status: "Invited To Apply",
            airtableId: uniqueId("rec_"),
            project: {
              __typename: "Project",
              id: uniqueId("project"),
              currency: "USD",
              primarySkill: "Testing",
              user: {
                __typename: "User",
                id: uniqueId("user"),
                companyName: "Test Inc",
              },
            },
            specialist: {
              __typename: "Specialist",
              id: uniqueId("specialist"),
              name: "Test Specialist",
              firstName: "Test",
              lastName: "Specialist",
              city: "Dublin",
              image: null,
              country: {
                __typename: "Country",
                id: uniqueId("country"),
                name: "Ireland",
              },
            },
          },
        },
      },
    },
    config
  );

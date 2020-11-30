import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import user from "@testing-library/user-event";
import {
  renderRoute,
  mockData,
  mockViewer,
  mockQuery,
  mockMutation,
} from "test-utils";

import * as queries from "./queries";

const company = mockData.company();

const manager = mockData.user({
  isTeamManager: true,
});

test("manager can add another team member", async () => {
  renderRoute({
    route: "/settings/team",
    graphQLMocks: [
      mockViewer(manager),
      mockQuery(
        queries.GET_TEAM_MEMBERS,
        {},
        {
          currentCompany: {
            ...company,
            users: [manager],
          },
        },
      ),
      mockMutation(
        queries.CREATE_USER_FOR_COMPANY,
        {
          email: "testnew@test.com",
          firstName: "New",
          lastName: "User",
          teamManager: false,
        },
        {
          createUserForCompany: {
            __typename: "CreateUserForCompanyPayload",
            user: mockData.user({
              email: "testnew@test.com",
              name: "New User",
              firstName: "New",
              lastName: "User",
              isTeamManager: false,
            }),
          },
        },
      ),
    ],
  });

  user.click(await screen.findByLabelText(/Add team member/i));
  user.type(await screen.findByLabelText(/first name/i), "New");
  user.type(await screen.findByLabelText(/last name/i), "User");
  user.type(await screen.findByLabelText(/email address/i), "testnew@test.com");
  const send = await screen.findByLabelText(/send invite/i);
  user.click(send);
  await waitForElementToBeRemoved(send);
  await screen.findByText(/testnew@test.com/i);
});

test("manager can promote another member", async () => {
  const nonManager = mockData.user({
    isTeamManager: false,
    name: "Jim Halpert",
  });

  renderRoute({
    route: "/settings/team",
    graphQLMocks: [
      mockViewer(manager),
      mockQuery(
        queries.GET_TEAM_MEMBERS,
        {},
        {
          currentCompany: {
            ...company,
            users: [manager, nonManager],
          },
        },
      ),
      mockMutation(
        queries.TOGGLE_TEAM_MANAGER,
        {
          userId: nonManager.id,
        },
        {
          toggleTeamManager: {
            __typename: "ToggleTeamManagerPayload",
            user: {
              ...nonManager,
              isTeamManager: true,
            },
          },
        },
      ),
    ],
  });

  const toggle = await screen.findByLabelText(/promote jim halpert/i);
  user.click(toggle);
  await screen.findByText(/jim halpert has been promoted/i);
});

test("manager can demote another manager", async () => {
  const nonManager = mockData.user({
    isTeamManager: true,
    name: "Jim Halpert",
  });

  renderRoute({
    route: "/settings/team",
    graphQLMocks: [
      mockViewer(manager),
      mockQuery(
        queries.GET_TEAM_MEMBERS,
        {},
        {
          currentCompany: {
            ...company,
            users: [manager, nonManager],
          },
        },
      ),
      mockMutation(
        queries.TOGGLE_TEAM_MANAGER,
        {
          userId: nonManager.id,
        },
        {
          toggleTeamManager: {
            __typename: "ToggleTeamManagerPayload",
            user: {
              ...nonManager,
              isTeamManager: false,
            },
          },
        },
      ),
    ],
  });

  const toggle = await screen.findByLabelText(/demote jim halpert/i);
  user.click(toggle);
  await screen.findByText(/jim halpert has been demoted/i);
});

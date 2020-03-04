import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import { mockViewer, mockQuery } from "../../testHelpers/apolloMocks";
import GET_PROFILE from "./getProfile";
import PROJECT_DETAILS from "./ProjectDetails/getProject";

test("Shows users profile", async () => {
  const skill = mockData.skill();
  const industry = mockData.industry();
  const profileProject = mockData.profileProject({
    industry,
    skills: [skill],
    industries: [industry],
  });

  const specialist = mockData.specialist({
    name: "John Doe",
    projectSkills: {
      __typename: "ProjectSkillsConnection",
      nodes: [skill],
    },
    industries: [industry],
    reviews: [],
    profileProjects: {
      __typename: "ProfileProjectsConnection",
      nodes: [profileProject],
    },
  });

  profileProject.specialist = specialist;

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];

  const app = renderApp({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });

  const name = await app.findByText("John Doe");
  expect(name).toBeInTheDocument();
});

test("Renders 404 if the specialist isn't found", async () => {
  const graphQLMocks = [
    mockViewer(null),
    {
      request: {
        query: GET_PROFILE,
        variables: {
          id: "randomID",
        },
      },
      result: {
        errors: [
          {
            message: "Resouce was not found",
            locations: [
              {
                line: 2,
                column: 3,
              },
            ],
            path: ["specialist"],
            extensions: {
              type: "INVALID_REQUEST",
              code: "notFound",
            },
          },
        ],
      },
    },
  ];

  const app = renderApp({
    route: `/freelancers/randomID`,
    graphQLMocks,
  });

  const status = await app.findByText("404");
  expect(status).toBeInTheDocument();
});

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

test("Can view freelancer project", async () => {
  const skill = mockData.skill();
  const industry = mockData.industry();
  const profileProject = mockData.profileProject({
    industry,
    skills: [skill],
    industries: [industry],
  });

  const specialist = mockData.specialist({
    name: "John Doe",
    projectSkills: {
      __typename: "ProjectSkillsConnection",
      nodes: [skill],
    },
    industries: [industry],
    reviews: [],
    profileProjects: {
      __typename: "ProfileProjectsConnection",
      nodes: [profileProject],
    },
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
    mockQuery(
      PROJECT_DETAILS,
      {
        specialist: specialist.id,
        project: profileProject.id,
      },
      {
        specialist: {
          ...specialist,
          profileProject: {
            ...profileProject,
            specialist,
          },
        },
      }
    ),
  ];

  const app = renderApp({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });

  resizeWindow(1200, 800);
  await app.findByText("John Doe");
  const viewProject = app.getByLabelText("View Project");
  fireEvent.click(viewProject);
});

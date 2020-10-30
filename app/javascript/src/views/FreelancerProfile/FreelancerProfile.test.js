import { fireEvent } from "@testing-library/react";
import generateType from "../../__mocks__/graphqlFields";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import { renderRoute, mockData } from "../../testHelpers/test-utils";
import { GET_COUNTRIES, GET_PROFILE, UPDATE_PROFILE } from "./queries";
import GET_PROJECT from "src/components/PreviousProjectDetails/getProject.js";

let user = generateType.user();
const skills = ["First skill", "Second skill", "Third skill"].map((name) => {
  return mockData.skill({ name: name });
});
const industries = [
  "First industry",
  "Second industry",
  "Third industry",
].map((name) => mockData.industry({ name }));
const country = mockData.country();
const countries = [{ ...country, value: country.id, label: country.name }];
const profileProject = mockData.previousProject({
  primarySkill: skills[0],
  primaryIndustry: industries[0],
  skills: [skills[0], skills[1]],
  industries: [industries[0], industries[1]],
});
const profileProjectAlt = mockData.previousProject({
  primarySkill: skills[2],
  primaryIndustry: industries[2],
  skills: [skills[2]],
  industries: [industries[2]],
  clientName: "Test Tech",
});
const review = mockData.review();
const specialist = mockData.specialist({
  name: "John Doe",
  projectSkills: {
    __typename: "ProjectSkillsConnection",
    nodes: skills,
  },
  industries,
  reviews: [review],
  profileProjects: [profileProject, profileProjectAlt],
});
profileProject.specialist = specialist;

test("can see top section", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];

  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });

  await app.findByText(specialist.name);
  await app.findByText(specialist.bio);
  await app.findByText(specialist.location);
});

test("can see skills and industries filter", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findAllByTestId(/skills-filter-tag/i);
  await app.findAllByTestId(/industries-filter-tag/i);
});

test("can filter previous projects by skill and clear filters", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  const skill = skills[2].name;
  await app.findAllByTestId(/skills-filter-tag/i);
  await app.findAllByTestId(/industries-filter-tag/i);
  const filterTag = app.getByTestId(`skills-filter-tag-${skill}`);
  fireEvent.click(filterTag);
  await app.findByText(`Showing ${skill} projects`);
  const numOfFilteredCards = app.getAllByTestId("project-card").length;
  expect(numOfFilteredCards).toBe(1);
  await app.findByText(`${skill} project`);
  const clearFiltersBtn = app.getByLabelText(/clear filters/i);
  fireEvent.click(clearFiltersBtn);
  const numOfCards = app.getAllByTestId("project-card").length;
  expect(numOfCards).toBe(2);
});

test("no filtered projects to display", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  const skill = skills[2].name;
  const industry = industries[0].name;
  const skillFilterTag = await app.findByTestId(`skills-filter-tag-${skill}`);
  const industryFilterTag = await app.findByTestId(
    `industries-filter-tag-${industry}`,
  );
  fireEvent.click(skillFilterTag);
  fireEvent.click(industryFilterTag);
  await app.findByText(`Showing ${skill} projects with ${industry} companies`);
  await app.findByText("No Projects");
});

test("can filter previous projects by industry and clear filters", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  const primarySkill = skills[2].name;
  const industry = industries[2].name;
  await app.findAllByTestId(/skills-filter-tag/i);
  await app.findAllByTestId(/industries-filter-tag/i);
  const filterTag = app.getByTestId(`industries-filter-tag-${industry}`);
  fireEvent.click(filterTag);
  await app.findByText(`with ${industry} companies`);
  const numOfFilteredCards = app.getAllByTestId("project-card").length;
  expect(numOfFilteredCards).toBe(1);
  await app.findByText(`${primarySkill} project`);
  const clearFiltersBtn = app.getByLabelText(/clear filters/i);
  fireEvent.click(clearFiltersBtn);
  const numOfCards = app.getAllByTestId("project-card").length;
  expect(numOfCards).toBe(2);
});

test("can see previous project", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(`${profileProject.primarySkill.name} project`);
  await app.findByText(profileProject.clientName);
});

test("can open previous project's dialog window", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
    mockQuery(
      GET_PROJECT,
      { id: profileProject.id },
      { previousProject: profileProject },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  const projectTitle = await app.findByText(
    `${profileProject.primarySkill.name} project`,
  );
  fireEvent.click(projectTitle);
  await app.findByText(profileProject.title);
  await app.findByText(/project description/i);
});

test("can see review", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(review.name);
  await app.findByText(`${review.role} at ${review.companyName}`);
  await app.findByText(review.comment);
});

test("edit profile info", async () => {
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
    mockQuery(GET_COUNTRIES, {}, { countries }),
    mockMutation(
      UPDATE_PROFILE,
      {
        city: "Kyiv",
        country: specialist.country.id,
        bio: "new bio",
        linkedin: specialist.linkedin || "",
        website: specialist.website || "",
      },
      {
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: {
            ...specialist,
            city: "Kyiv",
            bio: "new bio",
            location: `Kyiv, ${specialist.country.name}`,
          },
        },
      },
    ),
  ];

  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  const editInfoButton = await app.findByLabelText(/edit info/i);
  fireEvent.click(editInfoButton);
  await app.findByText(/edit profile info/i);
  fireEvent.change(app.getByLabelText(/city/i), { target: { value: "Kyiv" } });
  fireEvent.change(app.getByLabelText(/about me/i), {
    target: { value: "new bio" },
  });
  fireEvent.click(app.getByLabelText(/update/i));
  await app.findByText(`Kyiv, ${specialist.country.name}`);
  await app.findByText("new bio");
});

test("render profile as a user viewer", async () => {
  const graphQLMocks = [
    mockViewer(user),
    mockQuery(GET_PROFILE, { id: specialist.id }, { specialist }),
  ];

  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });

  const requestTalkButton = (
    await app.findByLabelText(/request a talk/i)
  ).closest("a");
  expect(requestTalkButton).toHaveAttribute(
    "href",
    `/request_consultation/${specialist.id}`,
  );
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

  const app = renderRoute({
    route: `/freelancers/randomID`,
    graphQLMocks,
  });
  const status = await app.findByText("404");
  expect(status).toBeInTheDocument();
});

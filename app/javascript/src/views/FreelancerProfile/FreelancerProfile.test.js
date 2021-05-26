import { screen, fireEvent } from "@testing-library/react";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import {
  renderRoute,
  mockData,
  mockBreakpoint,
} from "../../testHelpers/test-utils";
import { GET_COUNTRIES, GET_PROFILE, UPDATE_PROFILE } from "./queries";
import GET_PROJECT from "src/components/PreviousProjectDetails/getProject.js";
import truncate from "lodash/truncate";

let user = mockData.user();
const skills = ["First skill", "Second skill", "Third skill"].map((name) => {
  return mockData.skill({ name: name });
});
const industries = ["First industry", "Second industry", "Third industry"].map(
  (name) => mockData.industry({ name }),
);
const country = mockData.country();
const countries = [{ ...country, value: country.id, label: country.name }];
const review = mockData.review();
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
const specialist = mockData.specialist({
  name: "John Doe",
  projectSkills: {
    __typename: "ProjectSkillsConnection",
    nodes: skills,
  },
  industries,
  reviews: [review],
  previousProjects: {
    __typename: "PreviousProjectsConnection",
    nodes: [profileProject, profileProjectAlt],
  },
});
profileProject.specialist = specialist;

test("can see top section", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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
  await app.findByLabelText(`Showing ${skill} projects`, { exact: false });
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
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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
  await app.findByLabelText(
    `Showing ${skill} projects with ${industry} companies`,
  );

  await app.findByText("No Projects");
});

test("can filter previous projects by industry and clear filters", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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
  await app.findByLabelText(`Showing projects with ${industry} companies`);
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
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(`${profileProject.primarySkill.name} project`);
  await app.findByText(profileProject.clientName);
});

test("no previous projects to display", async () => {
  const specialist = mockData.specialist({
    name: "John Doe",
    projectSkills: {
      __typename: "ProjectSkillsConnection",
      nodes: skills,
    },
    industries,
    reviews: [review],
    profileProjects: [],
  });
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText("No Projects");
});

test("can open previous project's dialog window", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
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

test("can see wide review", async () => {
  mockBreakpoint("mUp");
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(review.name);
  await app.findByText(`${review.role} at ${review.companyName}`);
  await app.findByText(review.comment);
});

test("can see tablet review", async () => {
  mockBreakpoint("sUp");
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(review.name);
  await app.findByText(`${review.role} at ${review.companyName}`);
  await app.findByText(review.comment);
});

test("can see mobile review", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(review.name);
  await app.findByText(`${review.role} at ${review.companyName}`);
  await app.findByText(review.comment);
});

test("can see call to action card", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];
  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });
  await app.findByText(
    `Interested in collaborating with ${specialist.firstName}?`,
  );
});

test("exceeded the suggested length of bio", async () => {
  const newLongBio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Elementum eu facilisis sed odio morbi quis. Laoreet non curabitur gravida arcu ac. Ipsum consequat nisl vel pretium lectus quam id. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Facilisi cras fermentum odio eu. Lectus urna duis convallis convallis tellus. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Nisl nunc mi ipsum faucibus vitae aliquet.";
  const truncatedBio = truncate(newLongBio, { length: 280 });
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: true },
      { specialist },
    ),
    mockQuery(GET_COUNTRIES, {}, { countries }),
    mockMutation(
      UPDATE_PROFILE,
      {
        city: specialist.city,
        country: specialist.country.id,
        bio: newLongBio,
        linkedin: specialist.linkedin || "",
        website: specialist.website || "",
      },
      {
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: { ...specialist, bio: newLongBio },
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
  fireEvent.change(app.getByLabelText(/about me/i), {
    target: { value: newLongBio },
  });
  await app.findByText("You exceeded the suggested amount of symbols.");
  await app.findByText(
    "We highly recommend you to keep biography simple and short.",
  );
  await app.findByText("566/280");
  fireEvent.click(app.getByLabelText(/update/i));
  await app.findByText(truncatedBio);
  fireEvent.click(await app.findByTestId("expandCollapseBio"));
  await app.findByText(newLongBio);
  fireEvent.click(await app.findByTestId("expandCollapseBio"));
  await app.findByText(truncatedBio);
});

test("edit profile info", async () => {
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: true },
      { specialist },
    ),
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
    mockQuery(
      GET_PROFILE,
      { id: specialist.id, isOwner: false },
      { specialist },
    ),
  ];

  const app = renderRoute({
    route: `/freelancers/${specialist.id}`,
    graphQLMocks,
  });

  const requestTalkButtons = await app.findAllByLabelText(/request a talk/i);
  requestTalkButtons.forEach((button) => {
    expect(button.closest("a")).toHaveAttribute(
      "href",
      `/request_consultation/${specialist.id}`,
    );
  });
});

test("Renders 404 if the specialist isn't found", async () => {
  const graphQLMocks = [
    mockViewer(null),
    {
      request: {
        query: GET_PROFILE,
        variables: {
          id: "randomID",
          isOwner: false,
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
              code: "NOT_FOUND",
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

test("going to /profile when not logged in redirects to the login page", async () => {
  renderRoute({
    route: "/profile",
    graphQLMocks: [mockViewer(null)],
  });

  await screen.findByText(/welcome back/i);
});

test("going to /profile when logged in redirects to their profile", async () => {
  renderRoute({
    route: "/profile",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_PROFILE,
        { id: specialist.id, isOwner: true },
        { specialist },
      ),
      mockQuery(GET_COUNTRIES, {}, { countries }),
    ],
  });

  await screen.findByText(specialist.name);
  await screen.findByText(specialist.bio);
  await screen.findByText(specialist.location);
});

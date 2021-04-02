import React from "react";
import { screen, renderComponent, mockViewer, mockData } from "test-utils";
import useFeatureFlag from "./useFeatureFlag";

function TestCase({ feature }) {
  const enabled = useFeatureFlag(feature);
  return enabled ? `${feature} is enabled` : `${feature} is disabled`;
}

test("returns true when a feature is enabled", async () => {
  const user = mockData.user({ features: ["testing"] });

  renderComponent(<TestCase feature="testing" />, {
    graphQLMocks: [mockViewer(user)],
  });

  await screen.findByText(/testing is enabled/i);
});

test("returns false when a feature is disabled", async () => {
  const user = mockData.user({ features: ["different_feature"] });

  renderComponent(<TestCase feature="testing" />, {
    graphQLMocks: [mockViewer(user)],
  });

  await screen.findByText(/testing is disabled/i);
});

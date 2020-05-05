import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box, Card, Text } from "@advisable/donut";
import NotFound from "../NotFound";
import GET_DATA from "./getData";
import VerifyProject from "./VerifyProject";
import ValidationInProgress from "./ValidationInProgress";

function OmniauthLogin() {
  const csrf = document
    .querySelector("meta[name=csrf-token]")
    .getAttribute("content");

  return (
    <form action="/auth/linkedin" method="POST">
      <input type="hidden" name="authenticity_token" value={csrf} />
      <button>Go</button>
    </form>
  );
}

const VerifyProjectView = ({ match }) => {
  return (
    <Box paddingTop="xxl">
      <Card maxWidth={500} padding="l" margin="0 auto" borderRadius={8}>
        <OmniauthLogin />
      </Card>
    </Box>
  );
};

export default VerifyProjectView;

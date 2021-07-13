import React from "react";
import { useQuery } from "@apollo/client";
import { Container, useBreakpoint, useTheme } from "@advisable/donut";
import { useParams, useLocation } from "react-router-dom";
import Loading from "src/components/Loading";
import View from "src/components/View";
import SetupDots from "./SetupDots";
import SetupSteps from "./SetupSteps";
import JobSetupSidebar from "./JobSetupSidebar";
import { GET_JOB } from "./queries";

export default function JobSetup() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_JOB, {
    variables: { id },
  });

  const theme = useTheme();
  const location = useLocation();
  const mediumAndUp = useBreakpoint("mUp");
  const largeScreen = useBreakpoint("lUp");

  React.useEffect(() => {
    theme.updateTheme({ background: mediumAndUp ? "default" : "white" });
    return () => theme.updateTheme({ background: "default" });
  }, [mediumAndUp]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) return <Loading />;

  return (
    <View>
      {largeScreen ? <JobSetupSidebar data={data} /> : null}
      <View.Content>
        <Container paddingY={16} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          {!largeScreen && data.project.status === "Draft" && (
            <SetupDots
              marginBottom={{ _: "m", m: "l" }}
              justifyContent={{ _: "start", m: "center" }}
            />
          )}
          <SetupSteps data={data} />
        </Container>
      </View.Content>
    </View>
  );
}

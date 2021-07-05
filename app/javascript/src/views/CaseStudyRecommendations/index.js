import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import View from "src/components/View";
import { Box, useBreakpoint } from "@advisable/donut";
import Navigation from "./Navigation";
import Inbox from "./Inbox";

export default function CaseStudyExplorer() {
  const isLargeScreen = useBreakpoint("mUp");
  return (
    <View>
      <View.Sidebar width={["100%", "100%", "300px"]}>
        <Navigation />
      </View.Sidebar>
      <View.Content>
        <Box maxWidth={800} paddingY={12} paddingX={4} marginX="auto">
          <Switch>
            <Route path="/explore/inbox" component={Inbox} />
            {isLargeScreen && <Redirect to="/explore/inbox" />}
          </Switch>
        </Box>
      </View.Content>
    </View>
  );
}

import React, { useEffect } from "react";
import { Box, useBackground } from "@advisable/donut";
import { Switch, useLocation } from "react-router";
import Route from "src/components/Route";
import Shortlist from "./views/Shortlist";
import Shortlists from "./views/Shortlists";
import ShortlistArticle from "./views/ShortlistArticle";

export default function Discover() {
  useBackground("white");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box marginY={12} marginX={8}>
      <Box maxWidth="920px" mx="auto">
        <Switch>
          <Route path="/explore/:id/:articleId" component={ShortlistArticle} />
          <Route path="/explore/:id" component={Shortlist} />
          <Route path="/explore" component={Shortlists} />
        </Switch>
      </Box>
    </Box>
  );
}

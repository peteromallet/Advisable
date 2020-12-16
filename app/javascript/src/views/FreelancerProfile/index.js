import React, { useEffect } from "react";
// Hooks
import useLogoURL from "src/components/ApplicationProvider/useLogoURL";
import { useParams, Switch, Route } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import { useQuery } from "@apollo/client";
// Components
import NotFound, { isNotFound } from "../NotFound";
import Loading from "src/components/Loading";
import AboutSection from "./AboutSection";
import { Box, useBreakpoint } from "@advisable/donut";
import MainProfile from "./MainProfile";
import GuildProfile from "./GuildProfile";
// Queries
import { GET_PROFILE } from "./queries";

function FreelancerProfile() {
  useLogoURL("https://advisable.com");
  const params = useParams();
  const viewer = useViewer();
  const widescreen = useBreakpoint("sUp");
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  useEffect(() => {
    if (window.history) {
      window.history.scrollRestoration = "manual"; // disable automatic scroll restoration
    }
    const coverImgElement = document.getElementById("cover-img-wrapper");
    const offset = coverImgElement?.offsetTop;
    const height = coverImgElement?.offsetHeight;
    const HEADER = 58;
    const scrollY = offset - HEADER + (height / 100) * 64;
    widescreen && data && scrollY && window.scrollTo(0, scrollY);
  }, [data, widescreen]);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const isOwner = viewer?.id === data.specialist.id;

  return (
    <Box
      pb="2xl"
      mx={["12px", "32px", "32px", "auto"]}
      maxWidth={["100%", "100%", "100%", "960px"]}
    >
      <AboutSection
        specialist={data.specialist}
        isOwner={isOwner}
        viewer={viewer}
      />
      <Switch>
        <Route path="/freelancers/:id/guild">
          <GuildProfile specialist={data.specialist} />
        </Route>
        <Route path="/freelancers/:id">
          <MainProfile isOwner={isOwner} data={data} />
        </Route>
      </Switch>
    </Box>
  );
}

export default FreelancerProfile;

import React, { useEffect } from "react";
import MatchQueue from "./MatchQueue";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Sticky from "components/Sticky";
import ActionBar from "./ActionBar";
import ActionBarContainer from "./ActionBarContainer";
import MatchMetaInfo from "./MatchMetaInfo";
import ApplicationDetails from "./ApplicationDetails";

export default function Matches({ data, project }) {
  const matches = data.project.matches;
  const application = matches[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [application.id]);

  return (
    <Box paddingTop="40px" display="flex">
      <Box width="220px" marginRight="64px" flexShrink="0">
        <Sticky offset={100}>
          <MatchQueue matches={matches} />
          <MatchMetaInfo match={application} />
        </Sticky>
      </Box>
      <Box flexGrow="1" paddingBottom="100px">
        <ActionBarContainer>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              key={application.id}
            >
              <ApplicationDetails application={application} project={project} />
            </motion.div>
          </AnimatePresence>
          <ActionBar application={application} project={project} />
        </ActionBarContainer>
      </Box>
    </Box>
  );
}

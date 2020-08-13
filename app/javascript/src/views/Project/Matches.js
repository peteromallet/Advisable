import React, { useEffect } from "react";
import MatchQueue from "./MatchQueue";
import { CheckCircle, Trash } from "@styled-icons/heroicons-solid";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Sticky from "components/Sticky";
import ActionBar from "./ActionBar";
import MatchMetaInfo from "./MatchMetaInfo";
import SpecialistReviews from "./SpecialistReviews";
import SpecialistProjects from "./SpecialistProjects";
import SpecialistIntroduction from "./SpecialistIntroduction";

export default function Matches({ matches, onNext }) {
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
      <Box flexGrow="1" position="relative" paddingBottom="100px">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            key={application.id}
          >
            <SpecialistIntroduction application={application} />
            {application.previousProjects.length > 0 && (
              <SpecialistProjects projects={application.previousProjects} />
            )}
            {application.specialist.reviews.length > 0 && (
              <SpecialistReviews reviews={application.specialist.reviews} />
            )}
          </motion.div>
        </AnimatePresence>
        <ActionBar>
          <ActionBar.Item
            onClick={onNext}
            icon={<CheckCircle />}
            label="Accept"
          />
          <ActionBar.Item onClick={onNext} icon={<Trash />} label="Reject" />
          <ActionBar.Item onClick={onNext} icon={<Trash />} label="Reject" />
          <ActionBar.Item onClick={onNext} icon={<Trash />} label="Reject" />
          <ActionBar.Item onClick={onNext} icon={<Trash />} label="Reject" />
        </ActionBar>
      </Box>
    </Box>
  );
}

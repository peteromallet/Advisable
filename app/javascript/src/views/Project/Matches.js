import React, { useEffect } from "react";
import MatchQueue from "./MatchQueue";
import { XCircle, Moon } from "@styled-icons/boxicons-solid";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Sticky from "components/Sticky";
import ActionBar from "./ActionBar";
import MatchMetaInfo from "./MatchMetaInfo";
import ApplicationQuestions from "./ApplicationQuestions";
import AcceptApplication from "./AcceptApplication";
import SpecialistReviews from "./SpecialistReviews";
import SpecialistProjects from "./SpecialistProjects";
import RecommendationComment from "./RecommendationComment";
import SpecialistIntroduction from "./SpecialistIntroduction";

export default function Matches({ data, onNext }) {
  const matches = data.project.matches;
  const application = matches[0];

  const hasRecommendationComment = Boolean(application.comment);

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
            {hasRecommendationComment && <RecommendationComment data={data} />}
            <SpecialistIntroduction application={application} />
            {application.previousProjects.length > 0 && (
              <SpecialistProjects projects={application.previousProjects} />
            )}
            {application.questions.length > 0 && (
              <ApplicationQuestions questions={application.questions} />
            )}
            {application.specialist.reviews.length > 0 && (
              <SpecialistReviews reviews={application.specialist.reviews} />
            )}
          </motion.div>
        </AnimatePresence>
        <ActionBar>
          <AcceptApplication application={application} />
          <ActionBar.Item onClick={onNext} icon={<Moon />} label="Not Sure" />
          <ActionBar.Item onClick={onNext} icon={<XCircle />} label="Reject" />
        </ActionBar>
      </Box>
    </Box>
  );
}

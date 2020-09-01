import React, { useEffect } from "react";
import MatchQueue from "./MatchQueue";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowForward } from "@styled-icons/ionicons-outline";
import { Box, Text, Paragraph, Button } from "@advisable/donut";
import Sticky from "components/Sticky";
import ActionBar from "./ActionBar";
import ActionBarContainer from "./ActionBarContainer";
import MatchMetaInfo from "./MatchMetaInfo";
import ApplicationDetails from "./ApplicationDetails";
import { useWalkthrough, Walkthrough } from "./Walkthrough";
import { useCompleteTutorial } from "./queries";
import queryString from "query-string";
import { useLocation } from "react-router";

const steps = [
  {
    width: 460,
    component: function TutorialStart({ nextStep }) {
      return (
        <Box padding="32px">
          <Text
            fontSize="24px"
            fontWeight="medium"
            marginBottom="12px"
            letterSpacing="-0.03em"
          >
            You have received your first recommendation!
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            We think we have found a suitable freelancer for this job! As this
            is your first recommendation we would like to take a quick minute to
            show you around.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "matchScore",
    highlight: "matchDetails",
    placement: "right-start",
    component: function TutorialMatchScore({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="18px"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            Match Score
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            Each recommended freelancer has a match score. This is an indicator
            of how suitable we think a freelancer is for a job.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "actionBarAccept",
    highlight: "actionBar",
    placement: "top",
    component: function TutorialAccept({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="18px"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            Accepting a freelancer
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            If you like what you see, You can setup a call to talk details with
            the freelancer. After your call, if you both think the fit is right
            you can then start working together on Advisable.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "actionBarReject",
    highlight: "actionBar",
    placement: "top",
    component: function TutorialReject({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="18px"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            Rejecting a freelancer
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            If you don’t feel like the freelancer is a good fit you can reject
            them and we’ll handle the communication.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    width: 400,
    component: function TutorialFinish({ nextStep }) {
      return (
        <Box padding="32px">
          <Text
            fontSize="18px"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            That’s it!
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            That’s everything you need to know about recommendations. We’ll let
            you take it from here
          </Paragraph>
          <Button variant="dark" onClick={nextStep}>
            Okay
          </Button>
        </Box>
      );
    },
  },
];

function useOrderedMatches(matches) {
  const location = useLocation();
  const { candidate } = queryString.parse(location.search);

  if (!candidate) return matches;

  const index = matches.findIndex((match) => match.id === candidate);
  if (index === -1) return matches;
  const record = matches[index];

  return [record, ...matches.filter((match) => match.id !== candidate)];
}

export default function Matches({ data, project }) {
  const [completeTutorial] = useCompleteTutorial();
  const walkthrough = useWalkthrough(steps, {
    visible: !data.viewer.walkthroughComplete,
    onComplete: () => {
      completeTutorial({
        variables: {
          input: {
            tutorial: "RECOMMENDATIONS",
          },
        },
      });
    },
  });

  const matches = useOrderedMatches(data.project.matches);
  const application = matches[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [application.id]);

  return (
    <Box paddingTop="40px" display="flex">
      <Walkthrough {...walkthrough} />
      <Box width="220px" marginRight="64px" flexShrink="0">
        <Sticky offset={100}>
          <div data-walkthrough="matchDetails">
            <MatchQueue matches={matches} />
            <MatchMetaInfo match={application} />
          </div>
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

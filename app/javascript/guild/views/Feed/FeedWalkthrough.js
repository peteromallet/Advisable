import React from "react";
import { Box, Paragraph, Text, Button } from "@advisable/donut";
import { ArrowForward } from "@styled-icons/ionicons-outline";
import {
  useWalkthrough,
  Walkthrough,
} from "@advisable-main/components/Walkthrough";
import useTutorial from "@advisable-main/hooks/useTutorial";
import useScrollToTop from "@advisable-main/hooks/useScrollToTop";

const steps = [
  {
    width: 460,
    component: function TutorialStart({ nextStep }) {
      return (
        <Box padding="32px">
          <Text
            fontSize="4xl"
            fontWeight="medium"
            marginBottom="12px"
            letterSpacing="-0.03em"
          >
            Welcome to Advisable Guild!
          </Text>
          <Paragraph size="md" marginBottom="32px">
            We’d like to give you a quick tour of the feed to show you around
            and help you get the most out of Advisable Guild.
          </Paragraph>
          <Button
            marginRight="sm"
            suffix={<ArrowForward />}
            variant="dark"
            onClick={nextStep}
          >
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "createPost",
    highlight: "createPost",
    placement: "bottom",
    component: function TutorialCreatePost({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="xl"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            Post with purpose ✍️
          </Text>
          <Paragraph marginBottom="24px">
            We want the Guild feed to be as useful and clutter-free as possible,
            so keep a clear goal in mind each time you post. Unlike other
            platforms, Guild won‘t just send your voice out into the void: tell
            us your ideal audience, and we‘ll make sure they see your post.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "postReaction",
    highlight: "postReaction",
    placement: "top",
    clipPadding: 0,
    component: function TutorialPostReaction({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="xl"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            Bye, vanity metrics 👋
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            Guild isn‘t about racking up likes, shares and follows, but if you‘d
            like to give a freelancer a little nudge to say &quot;Hey, nice one
            - this post is interesting&quot;, here‘s where you can do that. You
            might just find you spark some fascinating connections.
          </Paragraph>
          <Button suffix={<ArrowForward />} variant="dark" onClick={nextStep}>
            Next
          </Button>
        </Box>
      );
    },
  },
  {
    anchor: "postConnect",
    highlight: "postConnect",
    placement: "top",
    clipPadding: 0,
    component: function TutorialPostConnect({ nextStep }) {
      return (
        <Box padding="24px">
          <Text
            fontSize="xl"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            No comments? 🤔
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            Guild‘s goal is to help you make meaningful connections with fellow
            freelancers, and we don‘t think public comments really work towards
            that. Instead, we‘ve given you the option to message or request a
            call with other Guild members, as that‘s how we reckon real
            relationships form.
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
            fontSize="4xl"
            fontWeight="medium"
            marginBottom="8px"
            letterSpacing="-0.02em"
          >
            That’s it!
          </Text>
          <Paragraph marginBottom="24px">
            That’s everything you need to know about the feed. If you’ve got
            feedback or questions for us, don’t hesitate to reach out!
          </Paragraph>
          <Button variant="dark" onClick={nextStep}>
            Okay
          </Button>
        </Box>
      );
    },
  },
];

const FeedWalkthrough = () => {
  useScrollToTop();

  const tutorial = useTutorial("GUILD");
  const walkthrough = useWalkthrough(steps, {
    visible: !tutorial.isComplete,
    onComplete: async () => {
      await tutorial.complete();
      return window.scroll(0, 0);
    },
  });

  return <Walkthrough {...walkthrough} />;
};

export default FeedWalkthrough;

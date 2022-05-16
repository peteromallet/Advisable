import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "src/components/Button";
import { useWalkthrough, Walkthrough } from "src/components/Walkthrough";
import useTutorial from "src/hooks/useTutorial";
import LostIllustration from "src/illustrations/zest/lost";

function FeedTourStep({ heading, children, nextStep }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium tracking-tight leading-tight mb-2">
        {heading}
      </h2>
      <p className="mb-5 text-sm font-inter text-neutral800">{children}</p>
      <Button size="sm" onClick={nextStep} suffix={<ArrowSmRight />}>
        Next
      </Button>
    </div>
  );
}

const steps = [
  {
    width: 500,
    component: function FeedIntroduction({ nextStep }) {
      return (
        <div className="px-8 py-12 text-center">
          <LostIllustration width="150px" className="inline-block mb-4" />
          <h2 className="text-2xl font-medium tracking-tight mb-1">
            Welcome to Advisable!
          </h2>
          <p className="font-inter text-sm text-neutral800 mb-6">
            We help you discover successful growth tactics & strategies executed
            by leading talent.
          </p>
          <Button onClick={nextStep} suffix={<ArrowSmRight />}>
            Next
          </Button>
        </div>
      );
    },
  },
  {
    highlight: "feed",
    placement: "left-start",
    offset: [-8, 20],
    component: function FeedExplanation({ nextStep }) {
      return (
        <FeedTourStep nextStep={nextStep} heading="Your feed">
          You'll see previous projects that are relevant to the topics that you
          follow.
        </FeedTourStep>
      );
    },
  },
  {
    highlight: "feed-item",
    placement: "left-start",
    component: function FeedItemExplanation({ nextStep }) {
      return (
        <FeedTourStep
          nextStep={nextStep}
          heading="Explore the projects you like"
        >
          If you find something intriguing, you can click in to understand how
          exactly they did it.
        </FeedTourStep>
      );
    },
  },
  {
    highlight: "feed-item-author",
    placement: "left-start",
    offset: [-8, 20],
    component: function FeedItemAuthorExplanation({ nextStep }) {
      return (
        <FeedTourStep
          nextStep={nextStep}
          heading="Reach out to the people behind them"
        >
          If you think the person behind a project could be a good collaborator,
          you can connect with them.
        </FeedTourStep>
      );
    },
  },
  {
    highlight: "interests",
    placement: "right-start",
    component: function FeedItemAuthorExplanation({ nextStep }) {
      return (
        <FeedTourStep nextStep={nextStep} heading="Topics">
          You can click into each one to see only projects related to that
          topic.
        </FeedTourStep>
      );
    },
  },

  {
    highlight: "search",
    placement: "bottom-start",
    component: function FeedItemAuthorExplanation({ nextStep }) {
      return (
        <FeedTourStep nextStep={nextStep} heading="Search for more">
          You can search for anything you'd like and follow the topic to get
          notified when new projects are added.
        </FeedTourStep>
      );
    },
  },

  {
    width: 400,
    component: function FeedWalkthroughEnd({ nextStep }) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-medium tracking-tight mb-1">
            That's it!
          </h2>
          <p className="font-inter text-sm text-neutral800 mb-6">
            You're ready to start exploring projects and connecting with the
            freelancers behind them.
          </p>
          <Button onClick={nextStep}>Let's go</Button>
        </div>
      );
    },
  },
];

export default function FeedTour() {
  const tutorial = useTutorial("feed");
  const [searchParams] = useSearchParams();
  const walkthrough = useWalkthrough(steps, {
    visible: searchParams.get("tour") || !tutorial.isComplete,
    onComplete: tutorial.complete,
  });

  return <Walkthrough {...walkthrough} />;
}

import React, { useState, useRef, useLayoutEffect } from "react";
import { animated, useSpring } from "react-spring";
import { withRouter } from "react-router-dom";
import Text from "src/components/Text";
import Avatar from "src/components/Avatar";
import Spacing from "src/components/Spacing";
import Button from "src/components/Button";
import FeaturedBadge from "src/components/FeaturedBadge";
import Questions from "./Questions";
import Skills from "src/components/Skills";
import CandidateAttributes from "src/components/CandidateAttributes";
import currency from "src/utilities/currency";
import AdvisableComment from "../AdvisableComment";
import CandidateActions from "../../../../components/CandidateActions";
import PreviousProjects from "../PreviousProjects";
import {
  Card,
  Name,
  Location,
  CandidateHeader,
  NameAndLocation,
  CandidateHeaderActions
} from "./styles";

const Candidate = ({ application, project, history }) => {
  const [expanded, setExpanded] = useState(false);
  const moreInfo = useRef(null);
  const [heightAnimation, setHeightAnimation] = useSpring(() => ({
    height: 0,
    opacity: 0
  }));

  const recalculateHeight = () => {
    const height = moreInfo.current ? moreInfo.current.getBoundingClientRect().height : 0;
    setHeightAnimation({ height });
  };

  useLayoutEffect(() => {
    recalculateHeight();
  });

  const handleExpand = () => {
    setExpanded(!expanded);
    setHeightAnimation({ opacity: expanded ? 0 : 1 });
  };

  return (
    <Card padding="xl" expanded={expanded}>
      <CandidateHeader>
        <Avatar
          name={application.specialist.name}
          url={
            application.specialist.image
              ? application.specialist.image.url
              : null
          }
        />
        <NameAndLocation>
          <Name>{application.specialist.name}</Name>
          <Location>
            {application.specialist.city}
            {application.specialist.country &&
              `, ${application.specialist.country.name}`}
          </Location>
        </NameAndLocation>
        <CandidateHeaderActions>
          {application.featured && <FeaturedBadge />}
          <AdvisableComment comment={application.comment} />
        </CandidateHeaderActions>
      </CandidateHeader>
      <CandidateAttributes
        compact
        reviewsCount={application.specialist.reviewsCount}
        rating={application.specialist.ratings.overall}
        rate={currency(application.rate, project.currency)}
        availability={application.availability}
        linkedin={application.specialist.linkedin}
      />

      <Text size="s" marginBottom="l">
        {application.introduction}
      </Text>

      <Button blank className="ViewMore" onClick={handleExpand}>
        {expanded ? (
          <svg width={13} height={6}>
            <path
              d="M1.314 6l-.668-.6 6-5.4 6 5.4-.667.6-5.333-4.798z"
              fill="#76859A"
              fillRule="nonzero"
            />
          </svg>
        ) : (
          <svg width={13} height={7}>
            <path
              d="M1.314.293l-.668.6 6 5.4 6-5.4-.667-.6L6.646 5.09z"
              fill="#76859A"
              fillRule="nonzero"
            />
          </svg>
        )}
        {expanded ? "View Less" : "View More"}
      </Button>

      <animated.div style={{ overflowY: "hidden", ...heightAnimation }}>
        <div ref={moreInfo}>
          {expanded && (
            <React.Fragment>
              <Questions questions={application.questions} />
              {application.specialist.skills.length > 0 && (
                <Spacing marginTop="xl">
                  <Skills skills={application.specialist.skills} />
                </Spacing>
              )}

              <Spacing paddingTop="l">
                <PreviousProjects
                  project={project}
                  recalculateHeight={recalculateHeight}
                  applicationId={application.airtableId}
                />
              </Spacing>
            </React.Fragment>
          )}
        </div>
      </animated.div>

      <CandidateActions history={history} application={application} />
    </Card>
  );
};

export default withRouter(Candidate);

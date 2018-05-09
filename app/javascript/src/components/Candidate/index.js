import React from "react";
import Text from "../Text";
import Avatar from "../Avatar";
import Button from "../Button";
import Questions from "./Questions";
import CandidateAttribute from "./CandidateAttribute";
import {
  Card,
  Name,
  Location,
  Description,
  CandidateHeader,
  CandidateAvatar,
  CandidateContent,
  NameAndLocation,
  CandidateFooter,
  CandidateAttributes
} from "./styles";

class Candidate extends React.Component {
  state = { expanded: false };

  render() {
    return (
      <Card>
        <CandidateContent>
          <CandidateHeader>
            <Avatar initials="TC" />
            <NameAndLocation>
              <Name>Thomas Cullen</Name>
              <Location>Dublin, Ireland</Location>
            </NameAndLocation>
          </CandidateHeader>
          <CandidateAttributes>
            <CandidateAttribute label="Hourly rate" value="€120" />
            <CandidateAttribute
              label="Available to start"
              value="Immediately"
            />
            <CandidateAttribute
              label="Ability to travel"
              value="Local or remote"
            />
            <CandidateAttribute label="Linkedin" value="View profile" />
          </CandidateAttributes>
          <Description>
            <Text>
              A simple short introduction paragraph. Donec facilisis tortor ut
              augue lacinia, at viverra est semper. Sed sapien metus, scelerisque
              nec pharetra id, tempor a tortor. Pellentesque non dignissim neque.
            </Text>
          </Description>
          <Questions />
        </CandidateContent>
        <CandidateFooter>
          <Button primary>Request Intro</Button>
          <Button>Reject</Button>
        </CandidateFooter>
      </Card>
    );
  }
}

export default Candidate;

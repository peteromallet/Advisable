import React from "react";
import Text from "src/components/Text";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
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
    const { application } = this.props;
    return (
      <Card>
        <CandidateContent>
          <CandidateHeader>
            <Avatar initials="TC" />
            <NameAndLocation>
              <Name>{application.specialist.name}</Name>
              <Location>
                {application.specialist.city}, {application.specialist.country}
              </Location>
            </NameAndLocation>
          </CandidateHeader>
          <CandidateAttributes>
            <CandidateAttribute label="Hourly rate" value={application.rate} />
            <CandidateAttribute
              label="Available to start"
              value={application.availability}
            />
            <CandidateAttribute
              label="Ability to travel"
              value={application.specialist.travel}
            />
            <CandidateAttribute
              label="Linkedin"
              value={
                <a target="_blank" href={application.specialist.linkedin}>
                  View Profile
                </a>
              }
            />
          </CandidateAttributes>
          <Description>
            <Text>
              {application.introduction}
            </Text>
          </Description>
          <Questions questions={application.questions} />
          <Text>Skills</Text>
          {application.specialist.skills.join(', ')}
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

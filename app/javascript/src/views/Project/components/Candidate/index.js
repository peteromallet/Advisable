import React from "react";
import Text from "src/components/Text";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import Questions from "./Questions";
import CandidateAttribute from "./CandidateAttribute";
import RejectModal from "../RejectModal";
import RequestIntroductionModal from "../RequestIntroductionModal";
import {
  Card,
  Name,
  Location,
  Description,
  CandidateWrapper,
  CandidateHeader,
  CandidateAvatar,
  CandidateContent,
  NameAndLocation,
  CandidateFooter,
  CandidateAttributes
} from "./styles";

class Candidate extends React.Component {
  state = {
    expanded: false,
    modal: null
  };

  render() {
    const { application } = this.props;

    return (
      <div style={this.props.style}>
        <Card>
          <RequestIntroductionModal
            isOpen={this.state.modal === "introduction"}
            application={application}
            onClose={() => {
              this.setState({ modal: null });
            }}
          />
          <RejectModal
            isOpen={this.state.modal === "reject"}
            application={application}
            onClose={() => {
              this.setState({ modal: null });
            }}
          />
          <CandidateContent>
            <CandidateHeader>
              <Avatar name={application.specialist.name} />
              <NameAndLocation>
                <Name>{application.specialist.name}</Name>
                <Location>
                  {application.specialist.city},{" "}
                  {application.specialist.country}
                </Location>
              </NameAndLocation>
            </CandidateHeader>
            <CandidateAttributes>
              <CandidateAttribute
                label="Hourly rate"
                value={application.rate}
              />
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
              <Text>{application.introduction}</Text>
            </Description>
            <Questions questions={application.questions} />
            <Text>Skills</Text>
            {application.specialist.skills.join(", ")}
          </CandidateContent>
          {application.status === "Applied" && (
            <CandidateFooter>
              <Button
                onClick={() => this.setState({ modal: "introduction" })}
                primary
              >
                Request Intro
              </Button>
              <Button onClick={() => this.setState({ modal: "reject" })}>
                Reject
              </Button>
            </CandidateFooter>
          )}
        </Card>
      </div>
    );
  }
}

export default Candidate;

import React from "react";
import { Spring } from "react-spring";
import Text from "src/components/Text";
import Avatar from "src/components/Avatar";
import Spacing from "src/components/Spacing";
import Button from "src/components/Button";
import Questions from "./Questions";
import CandidateAttribute from "./CandidateAttribute";
import RejectModal from "../RejectModal";
import RequestIntroductionModal from "../RequestIntroductionModal";
import currency from "src/utilities/currency";
import {
  Card,
  Name,
  Skill,
  Location,
  Description,
  Preview,
  MoreInfo,
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

  clickToExpand = e => {
    // Prevent expanding if the user clicked a link.
    if (e.target.tagName === "A") return;
    // Prevent expanding or collapsing if the user is selecting text.
    const selection = window.getSelection();
    if (this.state.expanded && selection.toString().length > 0) {
      return;
    }

    this.setState({ expanded: !this.state.expanded });
  };

  get moreInfoHeight() {
    return this.moreInfo ? this.moreInfo.scrollHeight : 0;
  }

  render() {
    const { application, project } = this.props;
    const image = application.specialist.image;

    return (
      <Card expanded={this.state.expanded}>
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
        <CandidateContent onClick={this.clickToExpand}>
          <CandidateHeader>
            <Avatar
              name={application.specialist.name}
              url={image ? image.url : null}
            />
            <NameAndLocation>
              <Name>{application.specialist.name}</Name>
              <Location>
                {application.specialist.city},{" "}
                {application.specialist.country.name}
              </Location>
            </NameAndLocation>
          </CandidateHeader>
          <CandidateAttributes>
            <CandidateAttribute
              label="Hourly rate"
              value={
                application.rate
                  ? currency(
                      application.rate,
                      project.currency || "EUR",
                    )
                  : "-"
              }
            />
            <CandidateAttribute
              label="Available to start"
              value="Yes"
              // value={application.availability || "-"}
            />
            {/* <CandidateAttribute
              label="Ability to travel"
              value={application.specialist.travel_availability || "-"}
            /> */}
            <CandidateAttribute
              label="Linkedin"
              value={
                <a target="_blank" href={application.specialist.linkedin}>
                  View Profile
                </a>
              }
            />
          </CandidateAttributes>

          <Preview expanded={this.state.expanded}>
            <Description>
              <Text>{application.introduction}</Text>
            </Description>
          </Preview>

          <Spring
            from={{ height: 0, opacity: 0 }}
            to={{
              height: this.state.expanded ? this.moreInfoHeight : 0,
              opacity: this.state.expanded ? 1 : 0
            }}>
            {styles => (
              <MoreInfo innerRef={c => (this.moreInfo = c)} style={styles}>
                <Questions questions={application.questions} />
                {application.specialist.skills.length > 0 && (
                  <Spacing bottom="xl">
                    <Text>Skills</Text>
                    {application.specialist.skills.map((skill, i) => (
                      <Skill key={i}>{skill}</Skill>
                    ))}
                  </Spacing>
                )}
              </MoreInfo>
            )}
          </Spring>
        </CandidateContent>

        {application.status === "Applied" && (
          <CandidateFooter>
            <Button
              onClick={() => this.setState({ modal: "introduction" })}
              primary>
              Request Intro
            </Button>
            <Button onClick={() => this.setState({ modal: "reject" })}>
              Reject
            </Button>
          </CandidateFooter>
        )}
      </Card>
    );
  }
}

export default Candidate;

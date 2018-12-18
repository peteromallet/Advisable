import React from "react";
import { Spring } from "react-spring";
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
import {
  Card,
  Name,
  Location,
  MoreInfo,
  CandidateHeader,
  NameAndLocation,
  CandidateHeaderActions
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

    return (
      <Card padding="xl" expanded={this.state.expanded}>
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
          rate={currency(application.rate, project.currency)}
          availability="Yes"
          linkedin={application.specialist.linkedin}
        />

        <Text size="s" marginBottom="l">
          {application.introduction}
        </Text>

        <Button blank className="ViewMore" onClick={this.clickToExpand}>
          {this.state.expanded ? (
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
          {this.state.expanded ? "View Less" : "View More"}
        </Button>

        <Spring
          from={{ height: 0, opacity: 0 }}
          to={{
            height: this.state.expanded ? this.moreInfoHeight : 0,
            opacity: this.state.expanded ? 1 : 0
          }}
        >
          {styles => (
            <MoreInfo innerRef={c => (this.moreInfo = c)} style={styles}>
              <Questions questions={application.questions} />
              {application.specialist.skills.length > 0 && (
                <Spacing marginTop="xl">
                  <Skills skills={application.specialist.skills} />
                </Spacing>
              )}
            </MoreInfo>
          )}
        </Spring>

        <CandidateActions
          history={this.props.history}
          application={application}
        />
      </Card>
    );
  }
}

export default withRouter(Candidate);

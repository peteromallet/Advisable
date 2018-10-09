import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { Query } from "react-apollo";
import Back from "src/components/Back";
import Card from "src/components/Card";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Link from "src/components/Link";
import Skills from "src/components/Skills";
import Button from "src/components/Button";
import Avatar from "src/components/Avatar";
import Spacing from "src/components/Spacing";
import Loading from "src/components/Loading";
import Divider from "src/components/Divider";
import Heading from "src/components/Heading";
import FeaturedBadge from "src/components/FeaturedBadge";
import CandidateAttributes from "src/components/CandidateAttributes";
import currency from "src/utilities/currency";
import RejectModal from "src/components/RejectModal";
import RejectProposalModal from "src/components/RejectProposalModal";
import RequestIntroduction from "src/components/RequestIntroduction";
import AdvisableMessage from "./components/AdvisableMessage";
import FETCH_APPLICATION from "./fetchApplication.graphql";
import {
  ApplicantHeader,
  ApplicantAvatar,
  ApplicantName,
  ApplicantLocation,
  AppliedTo,
  AdvisableComment
} from "./styles";

const REJECT_PROPOSAL_MODAL = 'REJECT_PROPOSAL_MODAL';

class Applicant extends React.Component {
  state = {
    modal: null
  };

  componentDidMount() {
    document.getElementById("view").scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById("view").scrollTo(0, 0);
    }
  }

  render() {
    const { match, history } = this.props;
    return (
      <Query
        query={FETCH_APPLICATION}
        variables={{
          projectID: match.params.projectID,
          applicationID: match.params.applicationID
        }}
      >
        {({ data, loading }) => {
          if (loading) return <Loading />;
          const project = data.project;
          const application = project.application;
          const proposal = application.proposal;
          const specialist = application.specialist;
          const otherApplicants = filter(project.applications, ap => {
            return ap.id !== application.id;
          });

          return (
            <React.Fragment>
              <RequestIntroduction
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

              <Back to={`/projects/${project.airtableId}`} paddingBottom="s">
                All Candidates
              </Back>
              <ApplicantHeader>
                <Flex align="center">
                  <Flex.Item distribute="fill">
                    <ApplicantAvatar
                      name={specialist.name}
                      url={get(specialist.image, "url")}
                    />
                  </Flex.Item>
                  <Flex.Item>
                    {application.featured && <FeaturedBadge />}
                  </Flex.Item>
                </Flex>
                <ApplicantName>{specialist.name}</ApplicantName>
                <ApplicantLocation>
                  {specialist.city}
                  {specialist.country && `, ${specialist.country.name}`}
                </ApplicantLocation>
                <AppliedTo>Applied to {project.name}</AppliedTo>
              </ApplicantHeader>
              <CandidateAttributes
                rate={currency(application.rate, project.currency)}
                availability={application.availability}
                linkedin={specialist.linkedin}
              />
              <Text marginBottom="xl">{application.introduction}</Text>
              {application.comment && (
                <AdvisableMessage>{application.comment}</AdvisableMessage>
              )}
              {application.questions.map((question, i) => (
                <Card key={i} padding="xl" marginBottom="l">
                  <Text marginBottom="m" weight="strong" colour="dark">
                    {question.question}
                  </Text>
                  <Text>
                    {/* Render line breaks in answers */}
                    {question.answer
                      .replace(/<br\s\/>/g, "\n")
                      .split("\n")
                      .map((item, key) => {
                        return (
                          <React.Fragment key={key}>
                            {item}
                            <br />
                          </React.Fragment>
                        );
                      })}
                  </Text>
                </Card>
              ))}

              <Skills
                marginTop="xxl"
                marginBottom="xxl"
                skills={specialist.skills}
              />

              {application.status === "Proposed" &&
                proposal && (
                  <React.Fragment>
                    <Button
                      marginRight="m"
                      onClick={() =>
                        this.props.history.push(
                          `/projects/${project.airtableId}/proposals/${
                            proposal.id
                          }`
                        )
                      }
                      primary
                    >
                      View Proposal
                    </Button>

                    <Button type='button' onClick={() => this.setState({ modal: REJECT_PROPOSAL_MODAL})}>
                      Reject
                    </Button>

                    <RejectProposalModal
                      booking={proposal}
                      specialist={application.specialist}
                      isOpen={this.state.modal === REJECT_PROPOSAL_MODAL}
                      onClose={() => this.setState({ modal: null })}
                    />
                  </React.Fragment>
                )}

              {application.status === "Applied" && (
                <Button
                  marginRight="m"
                  onClick={() => this.setState({ modal: "introduction" })}
                  primary
                >
                  Request Introduction
                </Button>
              )}

              {application.status === "Application Accepted" && (
                <Button
                  marginRight="m"
                  onClick={() =>
                    this.props.history.push(
                      `/projects/${project.airtableId}/applications/${
                        application.id
                      }/offer`
                    )
                  }
                  primary
                >
                  Send Offer
                </Button>
              )}

              {["Applied", "Application Accepted"].indexOf(application.status) >
                -1 && (
                <Button onClick={() => this.setState({ modal: "reject" })}>
                  Decline
                </Button>
              )}

              {otherApplicants.length > 0 && (
                <React.Fragment>
                  <Divider marginTop="xxl" marginBottom="xxl" />

                  <Spacing marginBottom="l">
                    <Flex align="baseline">
                      <Flex.Item distribute="fill">
                        <Heading size="s" marginBottom="xs">
                          More candidates like {specialist.name}
                        </Heading>
                      </Flex.Item>
                      <Link to={`/projects/${project.airtableId}`}>
                        View all candidates
                      </Link>
                    </Flex>
                  </Spacing>

                  {otherApplicants.map(
                    applicant =>
                      applicant.specialist ? (
                        <Card
                          key={applicant.id}
                          onClick={() => history.push(applicant.airtableId)}
                          padding="l"
                          marginBottom="m"
                        >
                          <Flex align="center">
                            <Avatar
                              name={applicant.specialist.name}
                              url={get(applicant.specialist.image, "url")}
                              marginRight="l"
                            />
                            <Flex.Item distribute="fill">
                              <Heading size="s">
                                {applicant.specialist.name}
                              </Heading>
                              <Text>
                                {applicant.specialist.city}
                                {applicant.specialist.country &&
                                  `, ${applicant.specialist.country.name}`}
                              </Text>
                            </Flex.Item>
                            {applicant.featured && <FeaturedBadge />}
                          </Flex>
                        </Card>
                      ) : null
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Applicant;

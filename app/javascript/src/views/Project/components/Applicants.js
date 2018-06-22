import React from "react";
import gql from "graphql-tag";
import filter from "lodash/filter";
import { Transition } from "react-spring";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";
import Candidate from "../components/Candidate";
import NoApplicants from "../components/NoCandidates";
import SimpleErrorBoundary from 'src/components/SimpleErrorBoundary';

class Applicants extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById("view").scrollTo(0, 0);
    }
  }

  render() {
    const { data, status, emptyStateText, countLabel } = this.props;
    const applications = filter(data.project.applications, { status });
    const count =
      applications.length === 1
        ? "1 Applicant"
        : `${applications.length} Applicants`;

    return (
      <React.Fragment>
        <Spacing bottom="s">
          <Heading size="l">{data.project.name}</Heading>
        </Spacing>

        <Spacing bottom="xl">
          <Text size="l">
            {countLabel || status} - {count}
          </Text>
        </Spacing>

        {applications.length > 0 ? (
          <div>
            {applications.map(application => (
              <SimpleErrorBoundary key={application.id}>
                <Candidate project={data.project} application={application} />
              </SimpleErrorBoundary>
            ))}
          </div>
        ) : (
          <NoApplicants text={emptyStateText} />
        )}
      </React.Fragment>
    );
  }
}

export default Applicants;

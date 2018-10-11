import React from "react";
import gql from "graphql-tag";
import filter from "lodash/filter";
import { Transition } from "react-spring";
import Text from "src/components/Text";
import Spacing from "src/components/Spacing";
import Candidate from "../components/Candidate";
import NoApplicants from "../components/NoCandidates";
import SimpleErrorBoundary from "src/components/SimpleErrorBoundary";

class Applicants extends React.Component {
  componentDidMount() {
    document.getElementById("view").scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById("view").scrollTo(0, 0);
    }
  }

  render() {
    const { data, status, emptyStateText, countLabel } = this.props;
    const applications = filter(data.project.applications, { status });

    return (
      <React.Fragment>
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

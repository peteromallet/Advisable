import React from "react";
import get from "lodash/get";
import countBy from "lodash/countBy";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";
import Icon from "src/components/Icon";
import { StatusList, Count, LoadingItem } from "./styles";
import FETCH_PROJECT from "src/views/Project/graphql/fetchProject.graphql";

const ProjectStatuses = ({ match, onNavigate }) => {
  const { data, loading, error } = useQuery(FETCH_PROJECT, {
    variables: { id: match.params.projectID },
  });

  const applications = get(data, "project.applications", []);
  const counts = countBy(applications, "status");
  const { projectID } = match.params;

  return (
    <StatusList>
      {loading ? (
        <React.Fragment>
          <LoadingItem style={{ width: "65%" }} />
          <LoadingItem style={{ width: "55%" }} />
          <LoadingItem style={{ width: "40%" }} />
          <LoadingItem style={{ width: "60%" }} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink to={`/projects/${projectID}/applied`} onClick={onNavigate}>
            <Icon icon="inbox" />
            Applied
            <Count>{counts["Applied"] || 0}</Count>
          </NavLink>
          <NavLink
            to={`/projects/${projectID}/introduced`}
            onClick={onNavigate}
          >
            <Icon icon="message-circle" />
            Introduced
            <Count>{counts["Application Accepted"] || 0}</Count>
          </NavLink>
          <NavLink to={`/projects/${projectID}/proposed`} onClick={onNavigate}>
            <Icon icon="file-text" />
            Proposed
            <Count>{counts["Proposed"] || 0}</Count>
          </NavLink>
          <NavLink to={`/projects/${projectID}/offered`} onClick={onNavigate}>
            <Icon icon="user-check" />
            Offered
            <Count>{counts["Offered"] || 0}</Count>
          </NavLink>
          <NavLink to={`/projects/${projectID}/rejected`} onClick={onNavigate}>
            <Icon icon="trash-2" />
            Rejected
            <Count>{counts["Application Rejected"] || 0}</Count>
          </NavLink>
        </React.Fragment>
      )}
    </StatusList>
  );
};

export default ProjectStatuses;

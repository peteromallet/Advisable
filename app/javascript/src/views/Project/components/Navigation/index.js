import React from "react";
import logo from "./logo.svg";
import get from "lodash/get";
import countBy from "lodash/countBy";
import Icon from "src/components/Icon";
import { Nav, StatusList, Count, LoadingItem } from "./styles";
import { NavLink, withRouter } from "react-router-dom";

const Navigation = ({ match, loading, data }) => {
  const applications = get(data, "project.applications", []);
  const counts = countBy(applications, "status");

  return (
    <Nav>
      <img src={logo} />
      <StatusList>
        {loading ? (
          <React.Fragment>
            <LoadingItem style={{ width: "85%" }} />
            <LoadingItem style={{ width: "100%" }} />
            <LoadingItem style={{ width: "70%" }} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to={`${match.url}/applied`}>
              <Icon icon="inbox" />
              Applied
              <Count>{counts["Applied"] || 0}</Count>
            </NavLink>
            <NavLink to={`${match.url}/introduced`}>
              <Icon icon="message-circle" />
              Introduced
              <Count>{counts["Application Accepted"] || 0}</Count>
            </NavLink>
            <NavLink to={`${match.url}/rejected`}>
              <Icon icon="trash-2" />
              Rejected
              <Count>{counts["Application Rejected"] || 0}</Count>
            </NavLink>
          </React.Fragment>
        )}
      </StatusList>
    </Nav>
  );
};

export default withRouter(Navigation);

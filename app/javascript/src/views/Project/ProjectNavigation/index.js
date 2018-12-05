// Renders the navigation for the project candidates view
import React from "react";
import get from "lodash/get";
import countBy from "lodash/countBy";
import Sticky from "react-stickynode";
import Icon from "src/components/Icon";
import pluralize from "src/utilities/pluralize";
import { Mobile } from "src/components/Breakpoint";
import ShareAction from "../components/ShareAction";
import {
  ProjectTitle,
  TotalApplicants,
  ProjectNavigation,
  NavMenu,
  NavMenuItem,
  NavMenuItemIcon,
  NavMenuItemCount
} from "./styles";

const navigation = [
  {
    path: "applied",
    label: "Applied",
    status: "Applied",
    icon: "inbox"
  },
  {
    path: "introduced",
    label: "Introduced",
    status: "Application Accepted",
    icon: "message-circle"
  },
  {
    path: "proposed",
    label: "Proposed",
    status: "Proposed",
    icon: "file-text"
  },
  {
    path: "offered",
    label: "Offered",
    status: "Offered",
    icon: "user-check"
  },
  {
    path: "rejected",
    label: "Declined",
    status: "Application Rejected",
    icon: "trash-2"
  }
];

export default ({ match, data }) => {
  const applications = get(data, "project.applications", []);
  const counts = countBy(applications, "status");

  return (
    <Mobile>
      {isMobile => (
        <ProjectNavigation>
          <Sticky enabled={!isMobile} top={112}>
            <ProjectTitle>{data.project.primarySkill}</ProjectTitle>
            <TotalApplicants>
              {pluralize(
                data.project.applications.length,
                "Applicant",
                "Applicants"
              )}
            </TotalApplicants>

            <NavMenu>
              {navigation.map(item => (
                <NavMenuItem
                  key={item.path}
                  replace={!isMobile}
                  to={`/projects/${match.params.projectID}/${item.path}`}
                >
                  <NavMenuItemIcon>
                    <Icon icon={item.icon} />
                  </NavMenuItemIcon>
                  {item.label}
                  <NavMenuItemCount>
                    {counts[item.status] || 0}
                  </NavMenuItemCount>
                </NavMenuItem>
              ))}
            </NavMenu>

            <ShareAction url={data.project.clientReferralUrl} />
          </Sticky>
        </ProjectNavigation>
      )}
    </Mobile>
  );
};

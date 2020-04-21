// Renders the navigation for the project candidates view
import React from "react";
import { get, filter, countBy } from "lodash-es";
import { Text, Icon } from "@advisable/donut";
import Sticky from "../../../components/Sticky";
import pluralize from "src/utilities/pluralize";
import useScrollRestore from "src/utilities/useScrollRestore";
import useMobile from "../../../utilities/useMobile";
import ShareAction from "../components/ShareAction";
import Layout from "../../../components/Layout";
import {
  NavMenu,
  NavMenuItem,
  NavMenuItemIcon,
  NavMenuItemCount,
} from "./styles";

const navigation = [
  {
    path: "applied",
    label: "Applied",
    status: "Applied",
    icon: "inbox",
  },
  {
    path: "introduced",
    label: "Introduced",
    status: "Application Accepted",
    icon: "message-circle",
  },
  {
    path: "proposed",
    label: "Proposed",
    status: "Proposed",
    icon: "file-text",
  },
  {
    path: "offered",
    label: "Offered",
    status: "Offered",
    icon: "user-check",
  },
  {
    path: "rejected",
    label: "Declined",
    status: "Application Rejected",
    icon: "trash-2",
  },
];

export default function ProjectNavigation({ match, data }) {
  useScrollRestore();
  const isMobile = useMobile();
  const applications = get(data, "project.applications", []);
  const excludedStatuses = [
    "Working",
    "Invited To Apply",
    "Invitation Rejected",
  ];
  const filtered = filter(applications, (a) => {
    if (a.hidden) return false;
    return excludedStatuses.indexOf(a.status) === -1;
  });
  const counts = countBy(filtered, "status");

  return (
    <Layout.Sidebar>
      <Sticky enabled={!isMobile} offset={98}>
        <Text mb="xxs" fontSize="xl" fontWeight="medium" color="blue900">
          {data.project.primarySkill}
        </Text>
        <Text color="neutral700">
          {pluralize(filtered.length, "Applicant", "Applicants")}
        </Text>

        <NavMenu>
          {navigation.map((item) => (
            <NavMenuItem
              key={item.path}
              replace={!isMobile}
              to={`/projects/${match.params.projectID}/${item.path}`}
            >
              <NavMenuItemIcon>
                <Icon icon={item.icon} />
              </NavMenuItemIcon>
              {item.label}
              <NavMenuItemCount>{counts[item.status] || 0}</NavMenuItemCount>
            </NavMenuItem>
          ))}
        </NavMenu>

        {data.project.clientReferralUrl && (
          <ShareAction url={data.project.clientReferralUrl} />
        )}
      </Sticky>
    </Layout.Sidebar>
  );
}

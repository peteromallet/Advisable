import React from "react";
import { Text } from "@advisable/donut";
import { useTeamMembers } from "./queries";
import TeamMember from "./TeamMember";
import LoadingSkeleton from "./LoadingSkeleton";
import NewTeamMember from "./NewTeamMember";

export default function TeamList() {
  const { loading, data, errors } = useTeamMembers();

  if (loading) return <LoadingSkeleton />;

  if (errors) {
    return (
      <Text color="neutral600" py={4}>
        Failed to load team members
      </Text>
    );
  }

  const members = data.viewer.company.users;

  return (
    <>
      {members.map((member) => (
        <TeamMember key={member.id} member={member} />
      ))}
      <NewTeamMember company={data.viewer.company} />
    </>
  );
}

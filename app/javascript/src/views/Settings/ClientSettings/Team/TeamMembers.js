import React from "react";
import { Text } from "@advisable/donut";
import { useTeamMembers } from "./queries";
import TeamMember from "./TeamMember";
import LoadingSkeleton from "./LoadingSkeleton";

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

  return data.viewer.company.users.map((user) => (
    <TeamMember key={user.id} member={user} />
  ));
}

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, Text, Box, Avatar, StyledAvatar } from "@advisable/donut";

const StyledFeaturedMember = styled(Box)`
  color: ${theme.colors.neutral700};

  ${StyledAvatar} {
    transition: transform 100ms;
  }

  &:hover {
    color: ${theme.colors.neutral900};

    ${StyledAvatar} {
      transform: scale(1.08);
    }
  }
`;

function FeaturedMember({ member }) {
  return (
    <StyledFeaturedMember
      as={Link}
      to={`/freelancers/${member.id}`}
      width="70px"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Avatar mb="3" name={member.name} url={member.avatar} size="m" />
      <Text
        color="inherit"
        fontWeight="medium"
        fontSize="xs"
        letterSpacing="-0.01rem"
      >
        {member.firstName}
      </Text>
    </StyledFeaturedMember>
  );
}

function LoadingFeaturedMembers({ featuredMembers }) {
  return (
    <Box display="grid" gridRowGap="6" gridTemplateColumns="1fr 1fr 1fr">
      {featuredMembers.map((member) => (
        <FeaturedMember key={member.id} member={member} />
      ))}
    </Box>
  );
}

export default LoadingFeaturedMembers;

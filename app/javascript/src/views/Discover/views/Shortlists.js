import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Stack } from "@advisable/donut";
import NoShortlists from "../components/NoShortlists";
import { useShortlists } from "../queries";
import ShortlistCard from "../components/ShortlistCard";

export default function Shortlists() {
  const { data, loading, error } = useShortlists();
  if (error) return <>error</>;

  const shortlists = data?.caseStudySearches || [];

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading fontSize="36px" fontWeight={650} letterSpacing="-0.06rem">
          Discover
        </Heading>
        {shortlists.length > 0 && (
          <Button as={Link} to="/explore/new" variant="dark">
            New Shortlist
          </Button>
        )}
      </Box>
      <Box height="1px" bg="neutral100" my={8} />
      {!loading && shortlists.length === 0 && <NoShortlists />}
      {!loading && shortlists.length > 0 && (
        <Stack spacing={16} divider="neutral100">
          {shortlists.map((shortlist) => (
            <ShortlistCard key={shortlist.id} shortlist={shortlist} />
          ))}
        </Stack>
      )}
      {loading && <>Loading...</>}
    </>
  );
}

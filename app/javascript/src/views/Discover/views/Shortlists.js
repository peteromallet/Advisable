import React from "react";
import { Link } from "react-router-dom";
import { PlusSm } from "@styled-icons/heroicons-solid";
import { Box, Button, Heading, Stack, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import NoShortlists from "../components/NoShortlists";
import { useShortlists } from "../queries";
import ShortlistCard from "../components/ShortlistCard";

export default function Shortlists() {
  const mUp = useBreakpoint("mUp");
  const { data, loading, error } = useShortlists();
  if (error) return <>error</>;

  const company = data?.currentCompany;
  const shortlists = data?.caseStudySearches || [];

  return (
    <>
      <Box
        display="flex"
        height="40px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading
          fontSize={{ _: "28px", m: "36px" }}
          fontWeight={650}
          letterSpacing="-0.06rem"
        >
          Discover
        </Heading>
        {shortlists.length > 0 && (
          <Button
            as={Link}
            prefix={mUp ? <PlusSm /> : null}
            to="/explore/new"
            variant="dark"
          >
            {mUp ? <>New Shortlist</> : <PlusSm />}
          </Button>
        )}
      </Box>
      <Box height="1px" bg="neutral100" my={8} />
      {!loading && shortlists.length === 0 && <NoShortlists />}
      {!loading && shortlists.length > 0 && (
        <Stack spacing={8} divider="neutral100">
          {shortlists.map((shortlist) => (
            <ShortlistCard
              key={shortlist.id}
              shortlist={shortlist}
              company={company}
            />
          ))}
        </Stack>
      )}
      {loading && <Loading />}
    </>
  );
}

import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
import Loading from "../../../components/Loading";
import PREVIOUS_PROJECTS from "./previousProjects";
import PreviousProjectsList from "./PreviousProjectsList";

const References = () => {
  const { data, loading, error } = useQuery(PREVIOUS_PROJECTS);

  if (loading) return <Loading />;

  return (
    <>
      <Text
        as="h2"
        color="blue900"
        fontSize="28px"
        fontWeight="semibold"
        letterSpacing="-0.02em"
        mb="s"
      >
        Previous Projects
      </Text>
      <Text lineHeight="m" color="neutral800" mb="l">
        Previous projects are one of the most effective ways to validate your
        skills and experience. Advisable uses them to decide who to invite to
        our platform, which projects to invite them to and gives you the
        opportunity to share them with clients when you’re applying for
        projects.
      </Text>

      {!loading && !error && (
        <PreviousProjectsList
          previousProjects={data.viewer.previousProjects.nodes}
        />
      )}
    </>
  );
};

export default References;

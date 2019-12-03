import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import { useParams, useLocation, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import AvailabilityInput from "../../components/Availability";
import useWindowSize from "../../utilities/useWindowSize";
import UPDATE_AVAILABILITY from "./updateAvailability";
import GET_CONSULTATION from "./getConsultation";

const Availability = ({ nextStep, previousStepURL }) => {
  const params = useParams();
  const location = useLocation();
  const [availability, setAvailability] = React.useState([]);
  const [updateAvailability, updateAvailabilityMutation] = useMutation(
    UPDATE_AVAILABILITY
  );

  const { height } = useWindowSize();

  const { data, loading } = useQuery(GET_CONSULTATION, {
    variables: { id: location.state?.consultationId },
    skip: !location.state?.consultationId,
  });

  const user = data?.consultation.user;

  React.useEffect(() => {
    if (!loading) setAvailability(user?.availability);
  }, [loading, user]);

  if (!location.state?.consultationId) {
    return <Redirect to={previousStepURL(params)} />;
  }

  if (loading) return <Loading />;

  const specialist = data.consultation.specialist;

  const handleSubmit = async () => {
    await updateAvailability({
      variables: {
        input: {
          id: user.id,
          availability: availability,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      },
    });

    nextStep(params);
  };

  return (
    <Box
      height={[height - 58, "auto"]}
      display={["flex", "block"]}
      flexDirection="column"
      flex="1 1 0%"
    >
      <Box padding={["m", "l"]} flexShrink={1}>
        <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
          Step 3
        </Text>
        <Text
          mb="xs"
          as="h2"
          fontSize="xxl"
          fontWeight="semibold"
          color="blue.8"
          letterSpacing="-0.025em"
        >
          Availability
        </Text>
        <Text color="neutral.8" lineHeight="s">
          Select the times you will be availabile for a consultation with{" "}
          {specialist.name}. The more times you select, the easier it'll be for
          us to find a time that suits them.
        </Text>
      </Box>
      <Box height={["100%", 300]} display="flex" flexGrow={1}>
        <AvailabilityInput selected={availability} onSelect={setAvailability} />
      </Box>
      <Box padding={["m", "l"]} flexShrink={1}>
        {availability.length < 6 && (
          <Box
            p="xs"
            mb="s"
            fontSize="s"
            bg="neutral.0"
            display="flex"
            borderRadius={8}
            color="neutral.7"
            alignItems="center"
          >
            <Icon icon="info" width={20} color="neutral.6" mr="xs" />
            Please select at least 3 available times
          </Box>
        )}
        <RoundedButton
          onClick={handleSubmit}
          width={["100%", "auto"]}
          suffix={<Icon icon="arrow-right" />}
          disabled={availability.length < 6}
          loading={updateAvailabilityMutation.loading}
        >
          Continue
        </RoundedButton>
      </Box>
    </Box>
  );
};

export default Availability;

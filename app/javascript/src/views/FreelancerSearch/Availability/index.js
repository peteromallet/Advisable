import React, { useEffect } from "react";
import { ArrowLeft } from "@styled-icons/feather";
import { Box, Text, Link, useTheme, useBreakpoint } from "@advisable/donut";
import { Formik, Form } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import useViewer from "../../../hooks/useViewer";
import Loading from "../../../components/Loading";
import GET_AVAILABILITY from "./getUserAvailability";
import UPDATE_AVAILABILITY from "./updateAvailability";
import AvailabilityMobileFields from "./AvailabilityMobileFields";
import AvailabilityDesktopFields from "./AvailabilityDesktopFields";

const Availability = ({ data }) => {
  const theme = useTheme();
  const viewer = useViewer();
  const history = useHistory();
  const location = useLocation();
  const selected = location.state?.freelancers || [];
  const getAvailability = useQuery(GET_AVAILABILITY);
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);
  const sUp = useBreakpoint("sUp");

  useEffect(() => {
    if (!sUp) {
      theme.updateTheme({ background: "white" });
    }

    return () => theme.updateTheme({ background: "default" });
  }, [sUp]);

  if (selected.length === 0) {
    return <Redirect to={`/freelancer_search/${data.search.id}/results`} />;
  }

  if (getAvailability.loading) {
    return <Loading />;
  }

  const initialValues = {
    timeZone:
      getAvailability.data?.viewer.timeZone ||
      Intl.DateTimeFormat()?.resolvedOptions()?.timeZone ||
      "",
    availability: getAvailability.data?.viewer.availability || [],
  };

  const handleSubmit = async (values) => {
    await updateAvailability({
      variables: {
        input: {
          id: viewer.id,
          ...values,
        },
      },
    });

    history.push({
      ...location,
      pathname: `/freelancer_search/${data.search.id}/topic`,
    });
  };

  const interviews = getAvailability.data?.viewer.interviews || [];
  const events = interviews.map((interview) => ({
    time: interview.startsAt,
    label: `Interview with ${interview.specialist.firstName}`,
  }));

  return (
    <Box maxWidth={700} mx="auto">
      <Link
        mb="xs"
        fontSize="m"
        fontWeight="medium"
        to="/freelancer_search"
        letterSpacing="-0.03em"
      >
        <Box display="inline-block" mr="2px">
          <ArrowLeft size={20} strokeWidth={2} />
        </Box>
        Back
      </Link>
      <Text
        mb="xs"
        fontSize="24px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Availability
      </Text>
      <Text fontSize="m" lineHeight="20px" color="neutral800" mb="m">
        Select the times you will be available for a consultation. The more
        times you select, the easier it'll be for us to find a time that suits
        them.
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            {sUp ? (
              <AvailabilityDesktopFields formik={formik} events={events} />
            ) : (
              <AvailabilityMobileFields formik={formik} />
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Availability;

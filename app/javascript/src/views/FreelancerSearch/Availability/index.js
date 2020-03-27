import React, { useEffect } from "react";
import {
  Box,
  Text,
  Link,
  Icon,
  useTheme,
  useBreakpoint,
} from "@advisable/donut";
import { Formik, Form } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
    return <Redirect to="/freelancer_search/results" />;
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

  return (
    <Box maxWidth={700} mx="auto">
      <Link
        fontSize="l"
        mb="s"
        fontWeight="medium"
        to="/freelancer_search"
        letterSpacing="-0.02em"
      >
        <Icon mr="2px" width={20} height={20} icon="arrow-left" />
        Back
      </Link>
      <Text
        mb="xs"
        fontSize="32px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Availability
      </Text>
      <Text fontSize="l" lineHeight="m" color="neutral800" mb="l">
        Select the times you will be available for a consultation. The more
        times you select, the easier it'll be for us to find a time that suits
        them.
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            {sUp ? (
              <AvailabilityDesktopFields formik={formik} />
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

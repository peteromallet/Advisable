import React from "react";
import { get } from "lodash-es";
import { useQuery } from "@apollo/client";
import { Box, Text } from "@advisable/donut";
import Avatar from "../../../components/Avatar";
import Status from "../../../components/Status";
import Skeleton from "../../../components/Skeleton";
import AttributeList from "../../../components/AttributeList";
import currency from "../../../utilities/currency";
import GET_APPLICATION from "../getApplicationForClient";
import CandidateAttributeList from "../../../components/CandidateAttributeList";
import ClientActions from "./ClientActions";

const ClientSidebar = (props) => {
  const { data, loading, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: props.applicationId,
    },
  });

  if (loading) {
    return (
      <>
        <Box paddingBottom="xs">
          <Skeleton style={{ height: 18, width: 140 }} />
        </Box>
        <Box paddingBottom="l">
          <Skeleton style={{ height: 14, width: 120 }} />
        </Box>
        <Box paddingBottom="l">
          <AttributeList>
            <AttributeList.Item
              label={<Skeleton style={{ height: 14, width: 70 }} />}
              value={<Skeleton style={{ height: 14, width: 80 }} />}
            />
            <AttributeList.Item
              label={<Skeleton style={{ height: 14, width: 80 }} />}
              value={<Skeleton style={{ height: 14, width: 100 }} />}
            />
            <AttributeList.Item
              label={<Skeleton style={{ height: 14, width: 60 }} />}
              value={<Skeleton style={{ height: 14, width: 75 }} />}
            />
          </AttributeList>
        </Box>
        <Skeleton style={{ height: 40, width: "100%" }} />
      </>
    );
  }

  if (error) {
    return <>Failed to fetch application</>;
  }

  if (!data.application) {
    return <>Application not found</>;
  }

  let application = data.application;
  let specialist = data.application.specialist;

  return (
    <>
      <Box paddingBottom="m">
        <Avatar
          size="l"
          name={specialist.name}
          url={get(specialist, "image.url")}
        />
      </Box>
      <Box paddingBottom="xxs">
        <Text size="l" weight="semibold" color="neutral900">
          {specialist.name}
        </Text>
      </Box>
      <Box paddingBottom="s">
        <Text size="xs" color="neutral700">
          {specialist.city}, {get(specialist, "country.name")}
        </Text>
      </Box>
      <Box paddingBottom="l">
        <Status>{data.application.status}</Status>
      </Box>
      <Box paddingBottom="l">
        {application.status === "Working" ? (
          <AttributeList>
            {Boolean(application.rate) && (
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(parseFloat(application.rate) * 100.0)}
              />
            )}

            {application.projectType === "Flexible" && (
              <AttributeList.Item
                label="Monthly Limit"
                value={`${application.monthlyLimit} hours`}
              />
            )}

            <AttributeList.Item
              label="Project Type"
              value={application.projectType}
            />
          </AttributeList>
        ) : (
          <CandidateAttributeList application={data.application} />
        )}
      </Box>
      <ClientActions application={data.application} />
    </>
  );
};

export default ClientSidebar;

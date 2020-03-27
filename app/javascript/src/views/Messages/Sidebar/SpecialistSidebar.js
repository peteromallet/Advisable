import React from "react";
import { get } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { Text, Padding } from "@advisable/donut";
import currency from "../../../utilities/currency";
import Status from "../../../components/Status";
import Skeleton from "../../../components/Skeleton";
import AttributeList from "../../../components/AttributeList";
import SpecialistActions from "./SpecialistActions";
import GET_APPLICATION from "../getApplicationForSpecialist";

// Renders the specialist sidebar on the messages view
const SpecialistSidebar = () => {
  const { data, loading, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: props.applicationId,
    },
  });

  if (loading) {
    return (
      <>
        <Padding bottom="xs">
          <Skeleton style={{ height: 18, width: 140 }} />
        </Padding>
        <Padding bottom="l">
          <Skeleton style={{ height: 14, width: 120 }} />
        </Padding>
        <Padding bottom="l">
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
        </Padding>
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

  return (
    <>
      <Padding bottom="xxs">
        <Text size="l" weight="semibold" color="neutral.N9">
          {get(application, "project.user.companyName")}
        </Text>
      </Padding>
      <Padding bottom="s">
        <Text size="xs" color="neutral.N7">
          {get(application, "project.primarySkill")}
        </Text>
      </Padding>
      <Padding bottom="l">
        <Status>{data.application.status}</Status>
      </Padding>
      <Padding bottom="l">
        <AttributeList>
          <AttributeList.Item
            label="Hourly Rate"
            value={currency(parseFloat(application.rate) * 100.0)}
          />

          {application.projectType === "Flexible" && (
            <AttributeList.Item
              label="Monthly Limit"
              value={`${application.monthlyLimit} hours`}
            />
          )}

          {application.status === "Working" ? (
            <AttributeList.Item
              label="Project Type"
              value={application.projectType}
            />
          ) : (
            <AttributeList.Item
              label="Available"
              value={application.availability}
            />
          )}
        </AttributeList>
      </Padding>
      <SpecialistActions application={application} />
    </>
  );
};

export default SpecialistSidebar;

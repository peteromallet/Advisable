import React from "react";
import { get } from "lodash-es";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ChevronRight } from "@styled-icons/feather";
import { Text, Box, Flex, Avatar } from "@advisable/donut";
import Status from "../../../components/Status";
import GET_APPLICATION from "../getApplicationForClient";
import { Topbar } from "../styles";

const ClientTopbar = (props) => {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: props.applicationId,
    },
  });

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>Failed to fetch application</>;
  }

  if (!data.application) {
    return <>Application not found</>;
  }

  let application = data.application;
  let specialist = data.application.specialist;

  const handleClick = () => {
    let url = `/projects/${application.project.airtableId}/applications/${application.airtableId}`;
    if (application.status === "Working") {
      url = `/manage/${application.airtableId}`;
    }

    history.push(url);
  };

  const actionText =
    application.status === "Working" ? "View Tasks" : "View Application";

  return (
    <>
      <Box paddingBottom="xs">
        <Topbar>
          <Flex align="center">
            <Box padding="s">
              <Avatar
                size="s"
                name={specialist.name}
                url={get(specialist, "image.url")}
              />
            </Box>
            <Flex.Item fill>
              <Box paddingBottom="xxs">
                <Text weight="semibold">{specialist.name}</Text>
              </Box>
              <Status>{application.status}</Status>
            </Flex.Item>
          </Flex>
        </Topbar>
      </Box>

      <Box paddingBottom="xxs">
        <Topbar style={{ height: 50 }}>
          <Flex align="center" onClick={handleClick}>
            <Flex.Item fill>
              <Box paddingLeft="s">
                <Text weight="medium">{actionText}</Text>
              </Box>
            </Flex.Item>
            <Box paddingRight="s">
              <ChevronRight size={24} strokeWidth={2} />
            </Box>
          </Flex>
        </Topbar>
      </Box>
    </>
  );
};

export default ClientTopbar;

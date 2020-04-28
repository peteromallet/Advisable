import React from "react";
import { get } from "lodash-es";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ChevronRight } from "@styled-icons/feather";
import { Text, Padding, Flex } from "@advisable/donut";
import Avatar from "../../../components/Avatar";
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

  const handleClick = (e) => {
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
      <Padding bottom="xs">
        <Topbar>
          <Flex align="center">
            <Padding size="s">
              <Avatar
                size="s"
                name={specialist.name}
                url={get(specialist, "image.url")}
              />
            </Padding>
            <Flex.Item fill>
              <Padding bottom="xxs">
                <Text weight="semibold">{specialist.name}</Text>
              </Padding>
              <Status>{application.status}</Status>
            </Flex.Item>
          </Flex>
        </Topbar>
      </Padding>

      <Padding bottom="xxs">
        <Topbar style={{ height: 50 }}>
          <Flex align="center" onClick={handleClick}>
            <Flex.Item fill>
              <Padding left="s">
                <Text weight="medium">{actionText}</Text>
              </Padding>
            </Flex.Item>
            <Padding right="s">
              <ChevronRight size={24} strokeWidth={2} />
            </Padding>
          </Flex>
        </Topbar>
      </Padding>
    </>
  );
};

export default ClientTopbar;

import React from "react";
import { get } from "lodash";
import {
  Text,
  Link,
  Avatar,
  Button,
  Tooltip,
  Box,
  Icon,
  Circle,
} from "@advisable/donut";
import { withRouter, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sticky from "../../components/Sticky";
import currency from "../../utilities/currency";
import { Padding } from "../../components/Spacing";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";
import TalkModal from "../../components/TalkModal";
import ProjectTypeModal from "./ProjectTypeModal";
import StopWorkingModal from "./StopWorkingModal";
const TALK_MODAL = "TALK_MODAL";

const Sidebar = ({ data, history, tutorial, match }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const application = data.application;
  const specialist = application.specialist;
  const [modal, setModal] = React.useState(null);
  const [projectTypeModal, setProjectTypeModal] = React.useState(false);

  const handleEditPayment = () => {
    history.push("/settings/payments");
  };

  return (
    <Sticky offset={98} enabled={!isMobile}>
      <Avatar
        mb="m"
        size="xl"
        name={specialist.name}
        url={specialist?.image?.url}
      />
      <Text
        as="h3"
        mb="xs"
        fontSize="xxl"
        color="blue.9"
        fontWeight="semibold"
        letterSpacing="-0.01em"
      >
        {specialist.name}
      </Text>
      <Box display="flex" alignItems="center">
        <Icon
          mr="xxs"
          width={16}
          height={16}
          icon="map-pin"
          strokewidth={1.5}
          color="neutral.7"
        />
        <Text color="neutral.7" letterSpacing="-0.015em">
          {specialist.city}
          {specialist.country && `, ${specialist.country.name}`}
        </Text>
      </Box>
      <TalkModal
        isOpen={modal === TALK_MODAL}
        onClose={() => setModal(null)}
        conversationId={application.id}
        participants={[application.specialist]}
      />

      <Padding top="xl">
        <Padding bottom="s">
          <Button
            width="100%"
            appearance="outlined"
            icon="message-circle"
            onClick={() => setModal(TALK_MODAL)}
          >
            Message {specialist.firstName}
          </Button>
        </Padding>
        {application.status === "Working" && (
          <>
            <Route
              path={`${match.path}/stop`}
              render={route => (
                <StopWorkingModal
                  isOpen
                  application={application}
                  onClose={() => history.replace(match.url)}
                />
              )}
            />
            <Button
              width="100%"
              appearance="outlined"
              icon="pause-circle"
              aria-label="Stop Working"
              onClick={() => history.replace(`${match.url}/stop`)}
            >
              Stop Working
            </Button>
          </>
        )}
      </Padding>

      <Box mt="xl" mb="m">
        <AttributeList>
          {application.rate && (
            <AttributeList.Item
              label="Hourly Rate"
              value={currency(parseFloat(application.rate) * 100.0)}
            />
          )}

          {application.projectType === "Flexible" && (
            <AttributeList.Item
              label="Monthly Limit"
              value={`${application.monthlyLimit} hours`}
              actions={
                <AttributeList.Action onClick={() => setProjectTypeModal(true)}>
                  <Icon icon="settings" />
                </AttributeList.Action>
              }
            />
          )}

          <AttributeList.Item
            label="Payment Method"
            value={data?.viewer.projectPaymentMethod}
            actions={
              <AttributeList.Action onClick={handleEditPayment}>
                <Icon icon="settings" />
              </AttributeList.Action>
            }
          />

          <ProjectTypeModal
            isOpen={projectTypeModal}
            application={application}
            onClose={() => setProjectTypeModal(false)}
          />

          <AttributeList.Item
            label="Project Type"
            value={
              <Tooltip
                placement="bottom-end"
                content={t(
                  `projectTypes.${application.projectType}.clientDescription`
                )}
              >
                <Box display="flex" alignItems="center">
                  <Icon
                    mt="2px"
                    mr="4px"
                    width={16}
                    height={16}
                    color="neutral.7"
                    icon="help-circle"
                  />
                  <span>
                    {t(`projectTypes.${application.projectType}.label`)}
                  </span>
                </Box>
              </Tooltip>
            }
          >
            <Box mt="s" px="s" py="12px" bg="neutral.2" borderRadius="12px">
              <Text
                fontSize="xs"
                lineHeight="xs"
                color="neutral.8"
                letterSpacing="-0.005em"
              >
                Want to work on a project basis and assign projects to{" "}
                {application.specialist.firstName}?
              </Text>
              <Link.External mt="s" fontSize="xs" href="#">
                Switch to project basis
              </Link.External>
            </Box>
          </AttributeList.Item>
        </AttributeList>
      </Box>

      <Padding bottom="xl">
        <VideoButton onClick={tutorial.start}>
          {t(`tutorials.${tutorial.name}.prompt`)}
        </VideoButton>
      </Padding>
    </Sticky>
  );
};

export default withRouter(Sidebar);

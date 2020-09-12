import React from "react";
import { get } from "lodash-es";
import { motion } from "framer-motion";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Button, Tooltip, Box, Avatar } from "@advisable/donut";
import { withRouter, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sticky from "../../components/Sticky";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import currency from "../../utilities/currency";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";
import TalkModal from "../../components/TalkModal";
import ProjectTypeModal from "./ProjectTypeModal";
import StopWorkingModal from "./StopWorkingModal";
import {
  HelpCircle,
  MessageCircle,
  PauseCircle,
  Edit,
} from "@styled-icons/feather";

const Sidebar = ({ data, history, tutorialModal, match }) => {
  const isMobile = useMobile();
  const dialog = useDialogState();
  const { t } = useTranslation();
  const application = data.application;
  const specialist = application.specialist;
  const [projectTypeModal, setProjectTypeModal] = React.useState(false);

  const handleEditPayment = () => {
    history.push("/settings/payments");
  };

  return (
    <Layout.Sidebar size="m">
      <Sticky offset={98} enabled={!isMobile}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box paddingBottom="l">
            <Avatar
              size="l"
              name={specialist.name}
              url={get(specialist, "image.url")}
            />
          </Box>
          <Heading level={3}>{specialist.name}</Heading>
          <Text size="xs">
            {specialist.city}
            {specialist.country && `, ${specialist.country.name}`}
          </Text>
          <TalkModal
            dialog={dialog}
            conversationId={application.id}
            participants={[application.specialist]}
          />

          <Box paddingTop="xl">
            <DialogDisclosure
              as={Button}
              mb="xs"
              width="100%"
              align="left"
              variant="subtle"
              prefix={<MessageCircle />}
              {...dialog}
            >
              Message {specialist.firstName}
            </DialogDisclosure>
            {application.status === "Working" && (
              <>
                <Route path={`${match.path}/stop`}>
                  <StopWorkingModal
                    isOpen
                    application={application}
                    onClose={() => history.replace(match.url)}
                  />
                </Route>
                <Button
                  width="100%"
                  align="left"
                  prefix={<PauseCircle />}
                  aria-label="Stop Working"
                  variant="subtle"
                  onClick={() => history.replace(`${match.url}/stop`)}
                >
                  Stop Working
                </Button>
              </>
            )}
          </Box>
          <Box paddingY="xl">
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
                  action={
                    <Button
                      size="s"
                      variant="subtle"
                      onClick={() => setProjectTypeModal(true)}
                    >
                      <Edit />
                    </Button>
                  }
                >
                  {application.monthlyLimit} hours
                </AttributeList.Item>
              )}

              <ProjectTypeModal
                isOpen={projectTypeModal}
                application={application}
                onClose={() => setProjectTypeModal(false)}
              />

              <AttributeList.Item
                label="Project Type"
                action={
                  <Button
                    size="s"
                    variant="subtle"
                    aria-label="Edit project type"
                    onClick={() => setProjectTypeModal(true)}
                  >
                    <Edit />
                  </Button>
                }
              >
                <Tooltip
                  content={t(
                    `projectTypes.${application.projectType}.clientDescription`,
                  )}
                >
                  <Box display="flex" alignItems="center">
                    <Box color="neutral500" mr="xxs">
                      <HelpCircle size={16} strokeWidth={2} />
                    </Box>
                    <div data-testid="projectType">
                      {t(`projectTypes.${application.projectType}.label`)}
                    </div>
                  </Box>
                </Tooltip>
              </AttributeList.Item>

              <AttributeList.Item
                label="Payment Method"
                action={
                  <Button variant="subtle" onClick={handleEditPayment} size="s">
                    <Edit />
                  </Button>
                }
              >
                {get(data, "viewer.projectPaymentMethod")}
              </AttributeList.Item>
            </AttributeList>
          </Box>
          <Box paddingBottom="xl">
            {application.projectType === "Flexible" && (
              <DialogDisclosure as={VideoButton} {...tutorialModal}>
                {t(`tutorials.flexibleProjects.prompt`)}
              </DialogDisclosure>
            )}
          </Box>
        </motion.div>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default withRouter(Sidebar);

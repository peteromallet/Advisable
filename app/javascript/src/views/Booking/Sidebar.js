import React from "react";
import { get } from "lodash-es";
import { RoundedButton, Tooltip, Box, Icon } from "@advisable/donut";
import { withRouter, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sticky from "../../components/Sticky";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import currency from "../../utilities/currency";
import { Padding } from "../../components/Spacing";
import { FadeIn } from "../../components/Animation";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";
import TalkModal from "../../components/TalkModal";
import ProjectTypeModal from "./ProjectTypeModal";
import StopWorkingModal from "./StopWorkingModal";
import { MessageCircle, PauseCircle, Edit } from "react-feather";
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
    <Layout.Sidebar size="m">
      <Sticky offset={98} enabled={!isMobile}>
        <FadeIn duration="500ms">
          <Padding bottom="l">
            <Avatar
              size="l"
              name={specialist.name}
              url={get(specialist, "image.url")}
            />
          </Padding>
          <Heading level={3}>{specialist.name}</Heading>
          <Text size="xs">
            {specialist.city}
            {specialist.country && `, ${specialist.country.name}`}
          </Text>
          <TalkModal
            isOpen={modal === TALK_MODAL}
            onClose={() => setModal(null)}
            conversationId={application.id}
            participants={[application.specialist]}
          />

          <Padding top="xl">
            <RoundedButton
              mb="xs"
              width="100%"
              align="left"
              variant="subtle"
              prefix={<MessageCircle />}
              onClick={() => setModal(TALK_MODAL)}
            >
              Message {specialist.firstName}
            </RoundedButton>
            {application.status === "Working" && (
              <>
                <Route
                  path={`${match.path}/stop`}
                  render={(route) => (
                    <StopWorkingModal
                      isOpen
                      application={application}
                      onClose={() => history.replace(match.url)}
                    />
                  )}
                />
                <RoundedButton
                  width="100%"
                  align="left"
                  prefix={<PauseCircle />}
                  aria-label="Stop Working"
                  variant="subtle"
                  onClick={() => history.replace(`${match.url}/stop`)}
                >
                  Stop Working
                </RoundedButton>
              </>
            )}
          </Padding>
          <Padding top="xl" bottom="xl">
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
                    <RoundedButton
                      size="s"
                      variant="subtle"
                      onClick={() => setProjectTypeModal(true)}
                    >
                      <Edit />
                    </RoundedButton>
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
                  <RoundedButton
                    size="s"
                    variant="subtle"
                    aria-label="Edit project type"
                    onClick={() => setProjectTypeModal(true)}
                  >
                    <Edit />
                  </RoundedButton>
                }
              >
                <Tooltip
                  content={t(
                    `projectTypes.${application.projectType}.clientDescription`,
                  )}
                >
                  <Box display="flex" alignItems="center">
                    <Icon
                      mr="xxs"
                      width={16}
                      height={16}
                      color="neutral.6"
                      icon="help-circle"
                    />
                    <div data-testid="projectType">
                      {t(`projectTypes.${application.projectType}.label`)}
                    </div>
                  </Box>
                </Tooltip>
              </AttributeList.Item>

              <AttributeList.Item
                label="Payment Method"
                action={
                  <RoundedButton
                    variant="subtle"
                    onClick={handleEditPayment}
                    size="s"
                  >
                    <Edit />
                  </RoundedButton>
                }
              >
                {get(data, "viewer.projectPaymentMethod")}
              </AttributeList.Item>
            </AttributeList>
          </Padding>
          <Padding bottom="xl">
            <VideoButton onClick={tutorial.start}>
              {t(`tutorials.${tutorial.name}.prompt`)}
            </VideoButton>
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default withRouter(Sidebar);

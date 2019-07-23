import React from "react";
import { get } from "lodash";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sticky from "react-stickynode";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Modal from "../../components/Modal";
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
import ProjectTypeModal from "../../components/ProjectTypeModal";
import ProjectMonthlyLimit from "../../components/ProjectMonthlyLimit";
import SET_PROJECT_TYPE from "./setProjectType";

const Sidebar = ({ data, history, tutorial }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const application = data.application;
  const specialist = application.specialist;
  const [talkModal, setTalkModal] = React.useState(false);
  const [projectTypeModal, setProjectTypeModal] = React.useState(false);
  const [monthlyLimitModal, setMonthlyLimitModal] = React.useState(false);

  const handleEditMonthlyLimit = () => {
    setMonthlyLimitModal(true);
  };

  const handleEditPayment = () => {
    history.push("/settings/payments");
  };

  return (
    <Layout.Sidebar size="m">
      <Sticky top={98} enabled={!isMobile}>
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
            isOpen={talkModal}
            onClose={() => setTalkModal(false)}
            conversationId={application.id}
            participants={[application.specialist]}
          />

          <Padding top="xl">
            <Button
              block
              icon="message-circle"
              styling="primary"
              onClick={() => setTalkModal(true)}
            >
              Message {specialist.firstName}
            </Button>
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
                <>
                  <Modal
                    isOpen={monthlyLimitModal}
                    onClose={() => setMonthlyLimitModal(false)}
                  >
                    <Padding size="xl">
                      <ProjectMonthlyLimit
                        applicationId={application.airtableId}
                        onUpdate={() => setMonthlyLimitModal(false)}
                        initialValues={{
                          monthlyLimit: application.monthlyLimit,
                        }}
                      />
                    </Padding>
                  </Modal>
                  <AttributeList.Item
                    label="Monthly Limit"
                    value={
                      <>
                        {application.monthlyLimit} hours
                        <br />
                        <Button
                          onClick={handleEditMonthlyLimit}
                          styling="plainSubtle"
                        >
                          Edit
                        </Button>
                      </>
                    }
                  />
                </>
              )}

              <Mutation mutation={SET_PROJECT_TYPE}>
                {setProjectType => (
                  <ProjectTypeModal
                    isOpen={projectTypeModal}
                    onClose={() => setProjectTypeModal(false)}
                    application={application}
                    onSubmit={async values => {
                      const { data } = await setProjectType({
                        variables: {
                          input: {
                            application: application.airtableId,
                            projectType: values.projectType,
                            monthlyLimit: values.monthlyLimit,
                          },
                        },
                      });

                      const a = data.setTypeForProject.application;
                      setProjectTypeModal(false);
                    }}
                  />
                )}
              </Mutation>

              <AttributeList.Item
                label="Project Type"
                value={
                  <>
                    <span data-testid="projectType">
                      {application.projectType}
                    </span>
                    <br />
                    <Button
                      styling="plainSubtle"
                      aria-label="Edit project type"
                      onClick={() => setProjectTypeModal(true)}
                    >
                      Edit
                    </Button>
                  </>
                }
              />

              <AttributeList.Item
                label="Payment Method"
                value={
                  <>
                    {get(data, "viewer.projectPaymentMethod")}
                    <br />
                    <Button onClick={handleEditPayment} styling="plainSubtle">
                      Edit
                    </Button>
                  </>
                }
              ></AttributeList.Item>
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

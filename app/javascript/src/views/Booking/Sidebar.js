import React from "react";
import { get } from "lodash";
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
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";
import ProjectMonthlyLimit from "../../components/ProjectMonthlyLimit";

export default ({ data }) => {
  const isMobile = useMobile();
  const application = data.application;
  const specialist = application.specialist;
  const [monthlyLimitModal, setMonthlyLimitModal] = React.useState(false);

  const handleEditMonthlyLimit = () => {
    setMonthlyLimitModal(true);
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
          <Padding top="m" bottom="l">
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
                          styling="plain"
                        >
                          Edit
                        </Button>
                      </>
                    }
                  />
                </>
              )}
            </AttributeList>
          </Padding>
        </FadeIn>
      </Sticky>
    </Layout.Sidebar>
  );
};

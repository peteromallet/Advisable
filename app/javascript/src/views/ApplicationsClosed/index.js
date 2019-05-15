import React from "react";
import { useTranslation } from "react-i18next";
import Text from "../../components/Text";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import Padding from "../../components/Spacing/Padding";

const ApplicationsClosed = () => {
  const { t } = useTranslation();

  return (
    <Container css="text-align: center;" size="s">
      <Padding bottom="s">
        <Heading size="s">{t("projects.applicationsClosed.title")}</Heading>
      </Padding>
      <Text size="s">{t("projects.applicationsClosed.description")}</Text>
    </Container>
  );
};

export default ApplicationsClosed;

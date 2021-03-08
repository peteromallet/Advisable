import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Heading from "../../components/Heading";
import Container from "../../components/Container";

const ApplicationsClosed = () => {
  const { t } = useTranslation();

  return (
    <Container css="text-align: center;" size="s">
      <Box paddingBottom="s">
        <Heading size="s">{t("projects.applicationsClosed.title")}</Heading>
      </Box>
      <Text fontSize="sm">{t("projects.applicationsClosed.description")}</Text>
    </Container>
  );
};

export default ApplicationsClosed;

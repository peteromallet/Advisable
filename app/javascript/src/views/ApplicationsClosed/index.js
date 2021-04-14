import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Container from "../../components/Container";

const ApplicationsClosed = () => {
  const { t } = useTranslation();

  return (
    <Container css="text-align: center;" size="s">
      <Box paddingBottom="s">
        <Text
          color="neutral900"
          fontSize="l"
          fontWeight="medium"
          lineHeight="l"
          letterSpacing="-0.015em"
        >
          {t("projects.applicationsClosed.title")}
        </Text>
      </Box>
      <Text fontSize="sm">{t("projects.applicationsClosed.description")}</Text>
    </Container>
  );
};

export default ApplicationsClosed;

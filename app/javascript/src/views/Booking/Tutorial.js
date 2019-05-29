import React from "react";
import { useTranslation } from "react-i18next";
import Text from "../../components/Text";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Spacing from "../../components/Spacing/Padding";

const BookingTutorial = ({ tutorial }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={tutorial.isActive}>
      <Spacing size="l" css="text-align: center;">
        <Spacing bottom="xs">
          <Text size="l" weight="bold">
            {t(`tutorials.${tutorial.name}.heading`)}
          </Text>
        </Spacing>
        <Text size="s">{t(`tutorials.${tutorial.name}.summary`)}</Text>
      </Spacing>
      <iframe
        width="100%"
        height="280"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Spacing size="l" css="text-align: center;">
        <Button size="l" styling="primary" onClick={tutorial.complete}>
          Continue
        </Button>
      </Spacing>
    </Modal>
  );
};

export default BookingTutorial;

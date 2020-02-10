import * as React from "react";
import { RoundedButton, Icon } from "@advisable/donut";
import { BottomBar, ButtonGroup, Flex, Padding } from "../../../components";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import StepDots from "../../../components/StepDots";
import { useScreenSize } from "../../../utilities/screenSizes";

const Actions = ({
  isSubmitting,
  steps,
  label = "Next",
  currentStep,
  onBack,
}) => {
  const isMobile = useScreenSize("small");

  if (isMobile) {
    return (
      <BottomBar>
        <Padding bottom="m">
          <Flex align="center" distribute="center">
            <StepDots total={steps.length} current={currentStep + 1} />
          </Flex>
        </Padding>
        <ButtonGroup fullWidth>
          {onBack && (
            <Button size="l" type="button" onClick={onBack} styling="outlined">
              Back
            </Button>
          )}
          <RoundedButton size="l" type="submit" loading={isSubmitting}>
            {label}
          </RoundedButton>
        </ButtonGroup>
      </BottomBar>
    );
  }

  return (
    <>
      <Divider />
      <RoundedButton
        size="l"
        margin="l"
        type="submit"
        suffix={<Icon icon="arrow-right" />}
        loading={isSubmitting ? true : undefined}
      >
        {label}
      </RoundedButton>
    </>
  );
};

export default Actions;

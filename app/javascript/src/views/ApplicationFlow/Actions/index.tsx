import * as React from "react";
import { BottomBar, ButtonGroup, Flex, Padding } from "../../../components";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import StepDots from "../../../components/StepDots";
import { useScreenSize } from "../../../utilities/screenSizes";

interface Props {
  isSubmitting: boolean;
  steps: [object];
  currentStep: number;
  label?: string;
  application: {
    status: string;
  };
  onBack?: Function;
}

const Actions = ({
  isSubmitting,
  steps,
  label = "Next",
  currentStep,
  onBack,
}: Props) => {
  const isMobile = useScreenSize("small");

  return (
    <React.Fragment>
      {!isMobile && (
        <React.Fragment>
          <Divider />
          <Padding size="xl">
            <Button
              size="l"
              type="submit"
              styling="green"
              aria-label={label}
              loading={isSubmitting ? true : undefined}
            >
              {label}
            </Button>
          </Padding>
        </React.Fragment>
      )}

      {isMobile && (
        <BottomBar>
          <Padding bottom="m">
            <Flex align="center" distribute="center">
              <StepDots total={steps.length} current={currentStep + 1} />
            </Flex>
          </Padding>
          <ButtonGroup fullWidth>
            {onBack && (
              <Button
                size="l"
                type="button"
                onClick={onBack}
                styling="outlined"
              >
                Back
              </Button>
            )}
            <Button
              size="l"
              type="submit"
              styling="green"
              aria-label={label}
              loading={isSubmitting}
            >
              {label}
            </Button>
          </ButtonGroup>
        </BottomBar>
      )}
    </React.Fragment>
  );
};

export default Actions;

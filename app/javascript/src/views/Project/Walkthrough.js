import { useState, useLayoutEffect, useCallback, useMemo, useRef } from "react";
import { rgba } from "polished";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Portal } from "reakit/Portal";
import { theme } from "@advisable/donut";
import { createPopper } from "@popperjs/core";

const StyledStepCard = styled(motion.div)`
  background: white;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 4px 8px ${rgba(theme.colors.neutral900, 0.08)},
    0 24px 40px ${rgba(theme.colors.neutral900, 0.24)};
`;

const StyledStep = styled.div`
  top: 50%;
  left: 50%;
  width: 100%;
  position: fixed;
  z-index: 100000;
  transform: translate(-50%, -50%);
  max-width: ${(p) => p.$width || 320}px;

  &[data-popper-placement^="top"] {
    ${StyledStepCard}::before {
      content: "";
      left: 50%;
      bottom: -8px;
      width: 0;
      height: 0;
      margin-left: -8px;
      position: absolute;
      border-top: 8px solid white;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
  }

  &[data-popper-placement^="right"] {
    ${StyledStepCard}::before {
      content: "";
      top: 20px;
      left: -8px;
      width: 0;
      height: 0;
      position: absolute;
      border-right: 8px solid white;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }

  &[data-popper-placement="right-start"] ${StyledStepCard}::before {
    top: 20px;
  }
`;

const CLIP_PADDING = 16;

const StyledBackdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  position: fixed;
  overflow: hidden;
  color: ${rgba("#F8F8F9", 0.75)};
`;

export function useWalkthrough(steps, opts = {}) {
  const [visible, setVisible] = useState(opts.visible || false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];

  useLayoutEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [visible]);

  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const end = useCallback(() => {
    setVisible(false);
    setCurrentStepIndex(0);

    if (opts.onComplete) {
      opts.onComplete();
    }
  }, [opts, setVisible]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      end();
    }
  }, [steps.length, currentStepIndex, setCurrentStepIndex, end]);

  return {
    visible,
    show,
    hide,
    end,
    steps,
    currentStep,
    nextStep,
  };
}

function getWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function Backdrop({ highlight }) {
  const [size, setSize] = useState(getWindowSize());

  const handleResize = useCallback(() => {
    setSize(getWindowSize());
  }, [setSize]);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const { width, height } = size;

  const maskDimensions = useMemo(() => {
    if (highlight) {
      const dimensions = highlight.getBoundingClientRect();
      return {
        x: dimensions.x - CLIP_PADDING,
        y: dimensions.y - CLIP_PADDING,
        width: dimensions.width + CLIP_PADDING * 2,
        height: dimensions.height + CLIP_PADDING * 2,
      };
    }

    return null;
  }, [highlight]);

  return (
    <StyledBackdrop
      as={motion.div}
      initial={{ opacitgy: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg width={width} height={height}>
        {highlight && (
          <defs>
            <mask id="mask">
              <rect x="0" y="0" width={width} height={height} fill="white" />
              <rect
                x={maskDimensions.x}
                y={maskDimensions.y}
                width={maskDimensions.width}
                height={maskDimensions.height}
                fill="black"
              />

              <rect
                x={maskDimensions.x}
                y={maskDimensions.y}
                width="12"
                height="12"
                fill="white"
              />
              <circle
                cx={maskDimensions.x + 12}
                cy={maskDimensions.y + 12}
                r="12"
                fill="black"
              />

              <rect
                x={maskDimensions.x + maskDimensions.width - 12}
                y={maskDimensions.y}
                width="12"
                height="12"
                fill="white"
              />
              <circle
                cx={maskDimensions.x + maskDimensions.width - 12}
                cy={maskDimensions.y + 12}
                r="12"
                fill="black"
              />

              <rect
                x={maskDimensions.x}
                y={maskDimensions.y + maskDimensions.height - 12}
                width="12"
                height="12"
                fill="white"
              />
              <circle
                cx={maskDimensions.x + 12}
                cy={maskDimensions.y + maskDimensions.height - 12}
                r="12"
                fill="black"
              />

              <rect
                x={maskDimensions.x + maskDimensions.width - 12}
                y={maskDimensions.y + maskDimensions.height - 12}
                width="12"
                height="12"
                fill="white"
              />
              <circle
                cx={maskDimensions.x + maskDimensions.width - 12}
                cy={maskDimensions.y + maskDimensions.height - 12}
                r="12"
                fill="black"
              />
            </mask>
          </defs>
        )}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="currentColor"
          mask="url(#mask)"
        ></rect>
      </svg>
    </StyledBackdrop>
  );
}

function getByDataWalkthough(name) {
  if (!name) return null;
  return document.querySelector(`*[data-walkthrough="${name}"]`);
}

export function Walkthrough({ currentStep, visible, steps, ...props }) {
  const stepRef = useRef(null);

  const anchor = useMemo(() => {
    return getByDataWalkthough(currentStep.anchor);
  }, [currentStep]);

  const highlight = useMemo(() => {
    return getByDataWalkthough(currentStep.highlight);
  }, [currentStep]);

  useLayoutEffect(() => {
    if (anchor || highlight) {
      const popper = createPopper(anchor || highlight, stepRef.current, {
        placement: currentStep.placement || "right",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 16],
            },
          },
        ],
      });

      return () => popper.destroy();
    }
  }, [anchor, highlight, currentStep.placement]);

  if (!visible) return null;

  const key = steps.indexOf(currentStep);

  return (
    <Portal>
      <StyledStep key={key} $width={currentStep.width} ref={stepRef}>
        <StyledStepCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <currentStep.component {...props} />
        </StyledStepCard>
      </StyledStep>
      {(!anchor || highlight) && <Backdrop highlight={highlight} />}
    </Portal>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Portal } from "reakit/Portal";
import { createPopper } from "@popperjs/core";
import "./walkthrough.css";

const CLIP_PADDING = 16;

const isInViewport = (el) => {
  const bounding = el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= window.innerHeight &&
    bounding.right <= window.innerWidth
  );
};

const scrollIfNeeded = (el) => {
  if (!isInViewport(el)) {
    const top = el.getBoundingClientRect().top - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export function useWalkthrough(steps, opts = {}) {
  const [visible, setVisible] = React.useState(opts.visible || false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(
    opts.initialStep || 0,
  );

  const currentStep = steps[currentStepIndex];

  React.useLayoutEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [visible]);

  const show = React.useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hide = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const end = React.useCallback(() => {
    setVisible(false);
    setCurrentStepIndex(0);

    if (opts.onComplete) {
      opts.onComplete();
    }
  }, [opts, setVisible]);

  const nextStep = React.useCallback(() => {
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

function Backdrop({ highlight, clipPadding }) {
  const [size, setSize] = React.useState(getWindowSize());

  const handleResize = React.useCallback(() => {
    setSize(getWindowSize());
  }, [setSize]);

  React.useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const { width, height } = size;

  const maskDimensions = React.useMemo(() => {
    if (highlight) {
      scrollIfNeeded(highlight);
      const dimensions = highlight.getBoundingClientRect();

      return {
        x: dimensions.x - clipPadding,
        y: dimensions.y - clipPadding,
        width: dimensions.width + clipPadding * 2,
        height: dimensions.height + clipPadding * 2,
      };
    }

    return null;
  }, [highlight, clipPadding]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="walkthrough-backdrop"
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
    </motion.div>
  );
}

function getByDataWalkthough(name) {
  if (!name) return null;
  return document.querySelector(`*[data-walkthrough="${name}"]`);
}

export function Walkthrough({ currentStep, visible, steps, ...props }) {
  const stepRef = React.useRef(null);

  const anchor = React.useMemo(() => {
    return getByDataWalkthough(currentStep.anchor);
  }, [currentStep]);

  const highlight = React.useMemo(() => {
    return getByDataWalkthough(currentStep.highlight);
  }, [currentStep]);

  const key = steps.indexOf(currentStep);

  React.useLayoutEffect(() => {
    if (anchor || highlight) {
      const popper = createPopper(anchor || highlight, stepRef.current, {
        placement: currentStep.placement || "right",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: currentStep.offset || [0, 20],
            },
          },
        ],
      });

      return () => popper.destroy();
    }
  }, [anchor, highlight, currentStep]);

  React.useLayoutEffect(() => {
    if (visible && anchor) return scrollIfNeeded(anchor);
  }, [visible, anchor]);

  if (!visible) return null;

  return (
    <Portal>
      <div
        key={key}
        ref={stepRef}
        className="walkthrough-step"
        style={{
          maxWidth: currentStep.width || 300,
        }}
      >
        <motion.div
          className="walkthrough-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <currentStep.component {...props} />
        </motion.div>
      </div>
      {(!anchor || highlight) && (
        <Backdrop
          highlight={highlight}
          clipPadding={currentStep.clipPadding ?? CLIP_PADDING}
        />
      )}
    </Portal>
  );
}

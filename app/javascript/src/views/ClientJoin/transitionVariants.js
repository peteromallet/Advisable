export const transitionVariants = {
  enter: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -30 : 30) : forwards ? 10 : -10,
      x: 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? 80 : -80) : forwards ? -40 : 40,
      x: 0,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.5 },
    };
  },
};

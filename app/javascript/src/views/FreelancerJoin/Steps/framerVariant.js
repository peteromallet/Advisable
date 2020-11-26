const cardAnimations = {
  enter: ({ largeScreen, forwards }) => {
    return {
      x: largeScreen ? 0 : forwards ? 80 : -80,
      y: largeScreen ? (forwards ? 80 : -80) : 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -80 : 80) : 0,
      x: largeScreen ? 0 : forwards ? -80 : 80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

export default cardAnimations;

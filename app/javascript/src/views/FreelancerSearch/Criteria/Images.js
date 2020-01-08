import React from "react";
import { useSpring, useTransform } from "framer-motion";
import { StyledImages, StyledImage } from "./styles";

const Images = () => {
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;

  const handleMouseMove = e => {
    mouseX.set(e.clientX - halfWidth);
    mouseY.set(e.clientY - halfHeight);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const useImagePosition = (min, max) => {
    return {
      x: useTransform(mouseX, [-halfWidth, 0, halfWidth], [min, 0, max]),
      y: useTransform(mouseY, [-halfHeight, 0, halfHeight], [min, 0, max]),
    };
  };

  const image01Position = useImagePosition(-8, 8);
  const image02Position = useImagePosition(-16, 16);
  const image03Position = useImagePosition(-20, 20);
  const image04Position = useImagePosition(-25, 25);
  const image05Position = useImagePosition(-20, 20);
  const image06Position = useImagePosition(-8, 8);

  return (
    <StyledImages>
      <StyledImage
        style={image01Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.5 }}
      />
      <StyledImage
        style={image02Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <StyledImage
        style={image03Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <StyledImage
        style={image04Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <StyledImage
        style={image05Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <StyledImage
        style={image06Position}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.5 }}
      />
    </StyledImages>
  );
};

export default Images;

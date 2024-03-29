import { motion } from "framer-motion";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CaseStudyArticle from "../CaseStudyArticle";
import SignupOverlay from "./SignupOverlay";

const backdropClassName = `
  fixed
  z-20
  inset-0
  pt-12
  bg-[rgba(0,0,0,.4)]
  overflow-scroll
  overscroll-contain
`;

const modalClassName = `
  w-full
  h-full
  bg-white
  relative
  shadow-2xl
  rounded-t-[32px]
`;

export default function ArticleModal() {
  const windowRef = useRef();
  const backdropRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [navigate, location]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  });

  return (
    <motion.div
      ref={backdropRef}
      className={backdropClassName}
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        ref={windowRef}
        className={modalClassName}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        data-testid="articleModal"
      >
        <div className="overflow-y-scroll h-full" id="article-scrollable-area">
          {location.state?.signupPrompt && <SignupOverlay />}
          <CaseStudyArticle />
        </div>
      </motion.div>
    </motion.div>
  );
}

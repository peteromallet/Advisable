import React, { useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import { ArrowUp } from "@styled-icons/heroicons-solid";

const MessagePromptContext = React.createContext();

export function useMessagePrompt() {
  const { setPrompt } = React.useContext(MessagePromptContext);

  const prompt = useCallback(
    (message, text) => {
      setPrompt({ id: message.id, text });
    },
    [setPrompt],
  );

  const dismiss = useCallback(() => setPrompt(null), [setPrompt]);

  return { prompt, dismiss };
}

export default function MessagePrompt({ simplebar, children }) {
  const [prompt, setPrompt] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const contextValue = useMemo(() => ({ setPrompt }), []);

  const handleClick = () => {
    const message = document.getElementById(prompt.id);
    const scrollView = simplebar.current.getScrollElement();
    scrollView.scrollTo(0, message.offsetTop - 20);
  };

  const callback = useCallback((entries) => {
    setVisible(!entries[0]?.isIntersecting);
  }, []);

  useEffect(() => {
    if (prompt) {
      const el = document.getElementById(prompt.id);
      if (!el) return;

      const observer = new IntersectionObserver(callback, {});
      observer.observe(el);

      return () => observer.unobserve(el);
    }
  }, [prompt, callback]);

  return (
    <MessagePromptContext.Provider value={contextValue}>
      <AnimatePresence>
        {prompt && visible && (
          <Box
            as={motion.div}
            position="absolute"
            top="12px"
            left="50%"
            zIndex={2}
            onClick={handleClick}
            padding={3}
            paddingX={5}
            bg="blue200"
            color="blue900"
            fontWeight={520}
            borderRadius="40px"
            display="flex"
            alignItems="center"
            boxShadow="l"
            style={{ transform: "translateX(-50%)", cursor: "pointer" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box marginRight={2}>
              <ArrowUp size={16} />
            </Box>
            {prompt.text}
          </Box>
        )}
      </AnimatePresence>
      {children}
    </MessagePromptContext.Provider>
  );
}

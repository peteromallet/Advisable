import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import { ArrowDown, ArrowUp } from "@styled-icons/heroicons-solid";

const MessagePromptContext = React.createContext();

export function useMessagePrompt(message, text) {
  const { setPrompt, prompt, visible, actioned } =
    React.useContext(MessagePromptContext);

  const show = useCallback(
    () => setPrompt({ id: message.id, text }),
    [setPrompt, message, text],
  );

  const dismiss = useCallback(() => setPrompt(null), [setPrompt]);

  const highlight = useMemo(() => {
    return message.id === prompt?.id && visible && actioned;
  }, [message, prompt, visible, actioned]);

  return { show, dismiss, highlight };
}

const DOWN = "DOWN";
const UP = "UP";

export default function MessagePrompt({ simplebar, children }) {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [actioned, setActioned] = useState(false);
  const [promptDirection, setPromptDirection] = useState(false);

  const contextValue = useMemo(
    () => ({
      prompt,
      actioned,
      setPrompt,
      visible,
    }),
    [prompt, actioned, visible],
  );

  const handleClick = () => {
    const message = document.getElementById(prompt.id);
    const scrollView = simplebar.current.getScrollElement();
    scrollView.scrollTo({ top: message.offsetTop - 20, behavior: "smooth" });
    setActioned(true);
  };

  const intersectionCallback = useCallback(
    ([entry]) => {
      const scrollView = simplebar.current.getScrollElement();
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        const isUp = entry.target.offsetTop < scrollView.scrollTop;
        setVisible(false);
        setActioned(false);
        setPromptDirection(isUp ? UP : DOWN);
      }
    },
    [simplebar],
  );

  useEffect(() => {
    if (prompt) {
      const el = document.getElementById(prompt.id);
      if (!el) return;

      const observer = new IntersectionObserver(intersectionCallback, {
        root: simplebar.current.getScrollElement(),
      });
      observer.observe(el);

      return () => observer.unobserve(el);
    }
  }, [prompt, intersectionCallback, simplebar]);

  return (
    <MessagePromptContext.Provider value={contextValue}>
      <AnimatePresence>
        {prompt && !visible && (
          <Box
            as={motion.div}
            position="absolute"
            top={promptDirection === UP && "12px"}
            bottom={promptDirection === DOWN && "20px"}
            left="50%"
            zIndex={2}
            onClick={handleClick}
            padding={3}
            paddingX={5}
            bg="neutral800"
            color="white"
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
              {promptDirection === UP ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </Box>
            {prompt.text}
          </Box>
        )}
      </AnimatePresence>
      {children}
    </MessagePromptContext.Provider>
  );
}

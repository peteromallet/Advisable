import React, { useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import { ArrowDown, ArrowUp } from "@styled-icons/heroicons-solid";

const MessagePromptContext = React.createContext();

export function useMessagePrompt() {
  const { setPrompt } = React.useContext(MessagePromptContext);

  const prompt = useCallback(
    (message, text) => setPrompt({ id: message.id, text }),
    [setPrompt],
  );

  const dismiss = useCallback(() => setPrompt(null), [setPrompt]);

  return { prompt, dismiss };
}

const DOWN = "DOWN";
const UP = "UP";

export default function MessagePrompt({ simplebar, children }) {
  const [prompt, setPrompt] = React.useState(null);
  const [promptDirection, setPromptDirection] = React.useState(false);

  const contextValue = useMemo(() => ({ setPrompt }), []);

  const handleClick = () => {
    const message = document.getElementById(prompt.id);
    const scrollView = simplebar.current.getScrollElement();
    scrollView.scrollTo({ top: message.offsetTop - 20, behavior: "smooth" });
  };

  const intersectionCallback = useCallback(
    ([entry]) => {
      const scrollView = simplebar.current.getScrollElement();
      if (entry.isIntersecting) {
        setPromptDirection(false);
      } else {
        const isUp = entry.target.offsetTop < scrollView.scrollTop;
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
        {prompt && promptDirection && (
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

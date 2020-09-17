import React from "react";
import { Box } from "@advisable/donut";
import { motion, AnimatePresence } from "framer-motion";
import useCallContext from "./useCallContext";

export default function ReconnectingNotification() {
  const { roomState } = useCallContext();
  const isReconnecting = roomState === "reconnecting";

  return (
    <AnimatePresence>
      {isReconnecting && (
        <Box
          as={motion.div}
          left="20px"
          bottom="20px"
          padding="lg"
          color="white"
          bg="neutral900"
          position="fixed"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Reconnecting...
        </Box>
      )}
    </AnimatePresence>
  );
}

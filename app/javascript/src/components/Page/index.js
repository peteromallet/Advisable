import React from "react";
import { Box } from "@advisable/donut";
import Footer from "src/components/Footer";

export default function Page({ children, width = "1020px" }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 60px)">
      <Box
        width="100%"
        marginX="auto"
        flex="1 0 auto"
        maxWidth={width}
        paddingBottom={6}
      >
        {children}
      </Box>
      <Box flexShrink={0}>
        <Footer />
      </Box>
    </Box>
  );
}

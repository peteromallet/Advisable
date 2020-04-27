import * as React from "react";
import { Box, Text } from "@advisable/donut";
import { MessageCircle } from "@styled-icons/feather";

export default function Message({ title, children, ...props }) {
  return (
    <Box
      bg="orange100"
      color="neutral700"
      padding="m"
      borderRadius="12px"
      {...props}
    >
      <Box display="flex" alignItems="center" mb="xs" color="orange900">
        <MessageCircle size={18} strokeWidth={2} />
        <Text ml="xxs" color="orange900" fontWeight="medium">
          {title}
        </Text>
      </Box>
      <Text>{children}</Text>
    </Box>
  );
}

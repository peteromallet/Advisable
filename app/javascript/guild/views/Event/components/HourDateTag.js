import React from "react";
import { hourDate } from "@guild/utils";
import { Text, Box } from "@advisable/donut";
import { Calendar } from "@styled-icons/heroicons-outline/Calendar";

export default function HourDateTag({ date, ...props }) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="12px"
      backgroundColor="blue900"
      color="white"
      padding="5px 14px"
      {...props}
    >
      <Calendar size="20px" color="#C8CCDC" />
      <Text marginLeft="2" fontWeight="medium" fontSize="4" lineHeight="m">
        {hourDate(date)}
      </Text>
    </Box>
  );
}

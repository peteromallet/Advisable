import React from "react";
import Box from "../Box";
import Card from "../Card";
import Stack from "./index";

export default {
  title: 'Utilities/Stack',
};

export const verticalStack = () => {
  return (
    <Card maxWidth={500} margin="50px auto" padding="m">
      <Stack spacing="xl" divider="neutral100">
        <Box height="60px" bg="neutral200" />
        <Box height="60px" bg="neutral200" />
        <Box height="60px" bg="neutral200" />
        <Box height="60px" bg="neutral200" />
      </Stack>
    </Card>
  );
};

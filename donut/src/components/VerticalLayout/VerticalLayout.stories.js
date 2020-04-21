import React from "react";
import { times } from "lodash-es";
import Box from "../Box";
import VerticalLayout from "./";

export default {
  title: "VerticalLayout",
};

const Header = () => (
  <Box bg="blue.9" color="white.9" padding="m">
    This is the header, it doesn't change size
  </Box>
);
const Footer = () => (
  <Box bg="blue.4" padding="m">
    This is the footer, it doesn't change size
  </Box>
);

export const verticalLayout = () => {
  return (
    <VerticalLayout header={<Header />} footer={<Footer />}>
      {times(100, (n) => {
        return (
          <Box bg="neutral.2" key={n}>
            Ths is the content It will fill the remaining space
          </Box>
        );
      })}
    </VerticalLayout>
  );
};

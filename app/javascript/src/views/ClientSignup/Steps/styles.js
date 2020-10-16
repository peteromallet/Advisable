import PropTypes from "prop-types";
import { Text, Box } from "@advisable/donut";

export const Title = ({ children, ...props }) => (
  <Text
    as="h2"
    color="blue900"
    fontSize={["xxl", "xxxl"]}
    lineHeight={["xxl", "xxxl"]}
    fontWeight="semibold"
    letterSpacing="-0.02em"
    mb="xs"
    {...props}
  >
    {children}
  </Text>
);

Title.propTypes = { children: PropTypes.node };

export const Description = ({ children, ...props }) => (
  <Text mb="l" lineHeight="21px" color="neutral800" {...props}>
    {children}
  </Text>
);

Description.propTypes = { children: PropTypes.node };

export const BulletListItem = ({ text, Icon, ...props }) => (
  <Box
    display="flex"
    border="1px solid"
    borderColor="neutral100"
    mb="s"
    py="s"
    px="m"
    borderRadius="12px"
    {...props}
  >
    <Box color="yellow500" my="auto">
      <Icon size={18} strokeWidth={2} />
    </Box>
    <Text lineHeight="21px" color="neutral600" ml="m" fontWeight="light">
      {text}
    </Text>
  </Box>
);

BulletListItem.propTypes = {
  children: PropTypes.node,
  Icon: PropTypes.elementType,
  text: PropTypes.string,
};

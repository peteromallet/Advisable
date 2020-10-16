import PropTypes from "prop-types";
import { Box, Text, Link, theme } from "@advisable/donut";
import styled from "styled-components";
import { variant } from "styled-system";

const StyledCrumb = styled(Text)`
  letter-spacing: 0;
  &:hover {
    color: ${(props) => props.variant === "link" && theme.colors.neutral600};
  }
  ${variant({
    variants: {
      active: {
        color: "neutral700",
        fontWeight: "medium",
        fontSize: "s",
        mr: "xs",
      },
      link: {
        color: "neutral400",
        fontWeight: "medium",
        fontSize: "s",
        mr: "xs",
      },
    },
  })}
`;

function Breadcrumbs({ number }) {
  return (
    <Box display="flex" mb="m" fontSize="s">
      <StyledCrumb
        as={number && Link}
        to="/settings/invoices/"
        variant={number ? "link" : "active"}
      >
        Invoices
      </StyledCrumb>
      {number && (
        <>
          <Text mr="xs" color="neutral400" fontSize="s">
            &gt;
          </Text>
          <StyledCrumb variant="active">#{number}</StyledCrumb>
        </>
      )}
    </Box>
  );
}

Breadcrumbs.propTypes = {
  number: PropTypes.string,
};

export default Breadcrumbs;

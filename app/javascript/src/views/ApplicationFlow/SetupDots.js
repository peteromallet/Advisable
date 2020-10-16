import PropTypes from "prop-types";
import { matchPath, useLocation } from "react-router-dom";
import { Box, Circle } from "@advisable/donut";

function Dot({ path, exact }) {
  const location = useLocation();
  const active = matchPath(location.pathname, { path, exact });

  return <Circle size="8px" mx="2px" bg={active ? "blue600" : "neutral200"} />;
}

Dot.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default function SetupDots(props) {
  return (
    <Box display="flex" {...props}>
      <Dot path="/invites/:id/apply/" exact />
      <Dot path="/invites/:id/apply/questions/:number" />
      <Dot path="/invites/:id/apply/references" />
      <Dot path="/invites/:id/apply/terms" />
    </Box>
  );
}

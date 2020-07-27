import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styled from "styled-components";

const Bar = styled.div`
  height: 3px;
  margin: 20px 0;
  border-radius: 2px;
  background: rgba(183, 189, 213, 0.34);
`;

const Inner = styled(motion.div)`
  height: 100%;
  background: #17cda1;
`;

export default function Progress({ amount }) {
  return (
    <Bar>
      <Inner
        initial={{ width: `${amount}%` }}
        animate={{ width: `${amount}%` }}
      />
    </Bar>
  );
}

Progress.propTypes = {
  amount: PropTypes.number,
};

import { useState, useRef, useEffect, Fragment } from "react";
import styled from "styled-components";

const Bar = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
  position: fixed;
  background: white;
  box-shadow: 0px -4px 20px rgba(50, 58, 87, 0.1);
`;

const Spacer = styled.div``;

const BottomBar = ({ children }) => {
  const [height, setHeight] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    setHeight(barRef.current.clientHeight);
  });

  return (
    <Fragment>
      <Bar ref={barRef}>{children}</Bar>
      <Spacer style={{ height: `${height}px` }} />
    </Fragment>
  );
};

export default BottomBar;

import React, { useRef } from "react";
import styled from "styled-components";
import Details from "./details";
import { useParams, useHistory } from "react-router-dom";

const StyledResourceModal = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`;

const StyledResourceModalWindow = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;

  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
`;

export default function ResourceModal() {
  const container = useRef(null);
  const history = useHistory();
  const { resourceName } = useParams();

  const handleClick = (e) => {
    if (e.target === container.current) {
      history.push(`/${resourceName}`);
    }
  };

  return (
    <StyledResourceModal ref={container} onClick={handleClick}>
      <StyledResourceModalWindow>
        <Details />
      </StyledResourceModalWindow>
    </StyledResourceModal>
  );
}

import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link, Text, theme } from "@advisable/donut";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";

const StyledBackButton = styled.div`
  z-index: 2;
  display: flex;
  position: absolute;
  left: 0;
  top: 12px;
  height: 48px;
  width: 100%;
  padding: 0 16px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.56);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  color: ${theme.colors.neutral600};
  transition: color 0.2s, box-shadow 0.2s;
  box-shadow: 0 0 0 0 ${theme.colors.neutral400};

  & span {
    font-size: ${theme.fontSizes.l}px;
  }

  & svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  &:hover {
    color: ${theme.colors.neutral800};
    box-shadow: 0 0 0 1px ${theme.colors.neutral400};
  }
`;

export default function BackButton({ children }) {
  const params = useParams();
  const id = params?.id;

  return (
    <StyledBackButton as={Link} to={`/freelancers/${id}`}>
      <ArrowLeft />
      <Text as="span">{children}</Text>
    </StyledBackButton>
  );
}

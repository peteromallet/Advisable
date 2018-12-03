import styled from "styled-components";
import { Link } from "react-router-dom";

export const NewProjectChoice = styled(Link)`
  display: block;
  position: relative;
  border-radius: 8px;
  margin-bottom: 20px;
  text-decoration: none;
  padding: 20px 40px 20px 20px;
  border: 1px solid rgba(77, 88, 128, 0.25);

  &:last-child { margin-bottom: 0 }

  &:hover {
    border-color: #173FCD;
  }

  h4 {
    color: #030f37;
    font-size: 15px;
    font-weight: 500;
    line-height: 19px;
    margin-bottom: 2px;
    letter-spacing: -0.02em;
  }

  p {
    color: #58638a;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
  }

  .Arrow {
    right: 20px;
    position: absolute;
    top: calc(50% - 5px);
  }
`;

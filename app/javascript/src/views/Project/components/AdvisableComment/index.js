import React from "react";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.6);
  }
`

const AdvisableNoteToggle = styled.div`
  z-index: 2;
  width: 40px;
  height: 40px;
  display: flex;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: rgba(255, 196, 34, 0.15);

  &::after {
    top: -1px;
    left: -1px;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    animation: ${blink} 1.5s infinite ease-out;
    border: 1px solid rgba(255, 196, 34, 0.45);
  }
`;

const Comment = styled.div`
  top: -20px;
  z-index: 1;
  width: 80vw;
  right: -20px;
  color: #536888;
  font-size: 14px;
  max-width: 350px;
  background: white;
  line-height: 20px;
  border-radius: 4px;
  position: absolute;
  font-style: italic;
  padding: 25px 75px 25px 25px;
  box-shadow: 0 4px 24px -4px rgba(35, 56, 85, 0.07),
    0 2px 80px 0 rgba(42, 55, 73, 0.2);

  opacity: 0;
  pointer-events: none;
  transform: scale(0.7);
  transform-origin: 100% 0%;
  transition: transform 300ms cubic-bezier(0.4, 0, 0, 1.2), opacity 300ms;

  @media (max-width: 768px) {
    width: 260px;
  }

  strong {
    display: block;
    color: #19283f;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    margin-bottom: 8px;
  }
`;

export const AdvisableComment = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: inline-block;

  &:hover,
  &:active {
    ${Comment} {
      opacity: 1;
      pointer-events: all;
      transform: scale(1);
    }

    ${AdvisableNoteToggle} {
      background: rgba(255, 196, 34, 0.2);
      &::after {
        display: none;
        animation: none;
      }
    }
  }
`;

export default ({ comment }) => {
  if (!comment) return null;

  return (
    <AdvisableComment>
      <AdvisableNoteToggle>
        <svg width={18} height={22}>
          <g
            stroke="#FFBA00"
            strokeWidth={2}
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M11 1H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-6-6z" />
            <path d="M11 1v6h6M13 12H5M13 16H5M7 8H5" />
          </g>
        </svg>
      </AdvisableNoteToggle>
      <Comment>
        <strong>Comment from Advisable</strong>
        {comment}
      </Comment>
    </AdvisableComment>
  );
};

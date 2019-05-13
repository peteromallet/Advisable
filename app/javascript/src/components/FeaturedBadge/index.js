import React from "react";
import styled, { css } from "styled-components";

const BadgeLabel = styled.span`
  color: #f6ab00;
  font-size: 10px;
  margin-top: 5px;
  font-weight: 600;
  line-height: 13px;
  text-align: right;
  text-transform: uppercase;
`;

export const FeaturedBadge = styled.div`
  position: relative;
  align-items: center;
  display: inline-flex;
  padding-right: 45px;

  svg {
    top: 50%;
    right: 0;
    position: absolute;
    transform: translateY(-50%);
  }

  ${props =>
    props.leftAligned &&
    css`
      ${BadgeLabel} {
        text-align: left;
        padding-right: 0;
        padding-left: 45px;
      }

      svg {
        left: 0;
        right: auto;
      }
    `}
`;

export default ({ leftAligned, hideLabel }) => {
  return (
    <FeaturedBadge leftAligned={leftAligned}>
      {!hideLabel && (
        <BadgeLabel>
          Recommended
          <br />
          Candidate
        </BadgeLabel>
      )}
      <svg width={36} height={42}>
        <title>Group</title>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
            <stop stopColor="#D49B00" offset="0%" />
            <stop stopColor="#AC7D00" offset="100%" />
          </linearGradient>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
            <stop stopColor="#FFCA3B" offset="0%" />
            <stop stopColor="#FFBA00" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path fill="url(#a)" d="M12 27h12v15l-6-4.167L12 42z" />
          <path
            d="M18 28.804l4.017.923 2.707-3.108 3.793-1.614.363-4.106L31 17.364l-2.12-3.535-.363-4.106-3.793-1.614L22.017 5 18 5.924 13.983 5l-2.707 3.109-3.793 1.614-.363 4.106L5 17.364l2.12 3.535.363 4.106 3.793 1.614 2.707 3.108L18 28.804zm0 4.104l-5.458 1.255-3.679-4.224-5.154-2.193-.493-5.579-2.88-4.803 2.88-4.804.493-5.579 5.154-2.193L12.542.564 18 1.82 23.458.564l3.679 4.224 5.154 2.193.493 5.58 2.88 4.803-2.88 4.803-.493 5.58-5.154 2.192-3.679 4.224L18 32.908z"
            fillOpacity={0.196}
            fill="#FFBA00"
            fillRule="nonzero"
          />
          <path
            fill="url(#b)"
            d="M18 28.804l-4.017.923-2.707-3.108-3.793-1.614-.363-4.106L5 17.364l2.12-3.535.363-4.106 3.793-1.614L13.983 5 18 5.924 22.017 5l2.707 3.109 3.793 1.614.363 4.106L31 17.364l-2.12 3.535-.363 4.106-3.793 1.614-2.707 3.108z"
          />
        </g>
      </svg>
    </FeaturedBadge>
  );
};

import styled from "styled-components";
import { StarRating } from "src/components/StarRating/styles";

export const Review = styled.div`
  padding: 20px;
  background: #f2f3f7;
  border-radius: 10px;
`;

export const ReviewHeader = styled.div`
  position: relative;
  padding-left: 50px;
  margin-bottom: 20px;
`;

export const TotalRating = styled.div`
  left: 0;
  top: 50%;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  border-radius: 4px;
  background: #ffa929;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);

  &:before {
    top: 0;
    left: 0;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-right: 40px solid transparent;
    border-top: 40px solid rgba(255, 255, 255, 0.15);
  }
`;

export const Ratings = styled.div`
  padding-bottom: 10px;

  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Rating = styled.div`
  width: 50%;
  float: left;
  display: flex;
  margin-bottom: 10px;
  align-items: center;

  &:nth-child(odd) {
    padding-right: 15px;
  }

  &:nth-child(even) {
    padding-left: 15px;
  }

  strong {
    flex-grow: 1;
    font-size: 14px;
    color: #0a1745;
    font-weight: 500;
  }

  @media screen and (max-width: 750px) {
    width: 100%;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

export const ReviewComment = styled.p`
  color: #272f4b;
  font-size: 15px;
  line-height: 20px;
  font-style: italic;
`;

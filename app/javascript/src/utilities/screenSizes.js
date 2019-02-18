import { css } from "styled-components";
import useMediaQuery from './useMediaQuery';

const SIZES = {
  // Small covers phones
  small: 700,
  // Medium cover most tablets
  medium: 900,
  // Large is desktop and up
  large: 1000,
}

export const breakpoints = Object.keys(SIZES).reduce((obj, label) => {
  obj[label] = (styles) => css`
    @media (max-width: ${SIZES[label] / 16}em) {
      ${styles}
    }
  `

  return obj
}, {})

export const useScreenSize = size => {
  const width = SIZES[size];
  return useMediaQuery(`(max-width: ${width / 16}em)`);
}
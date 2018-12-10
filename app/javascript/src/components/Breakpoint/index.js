import MediaQuery from "react-responsive";
import useMediaQuery from './useMediaQuery';

export const Mobile = MediaQuery;
Mobile.defaultProps = {
  maxWidth: 800,
}

export const useMobile = () => useMediaQuery('(max-width: 800px)')

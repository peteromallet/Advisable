import styled from "styled-components";
import reduce from "lodash/reduce";

const sizes = {
  xs: "5px",
  s: "10px",
  m: "15px",
  l: "20px",
  xl: "30px",
  xxl: "50px"
};

const Spacing = styled.div`
  display: ${props => (props.inline ? "inline-block" : "block")};
  width: ${props => (props.inline ? "auto" : "100%")};
`;

export const withSpacing = Component => Component.extend`
  padding-top: ${props => sizes[props.paddingTop || props.padding]};
  padding-right: ${props => sizes[props.paddingRight || props.padding]};
  padding-bottom: ${props => sizes[props.paddingBottom || props.padding]};
  padding-left: ${props => sizes[props.paddingLeft || props.padding]};
  margin-top: ${props => sizes[props.marginTop || props.margin]};
  margin-right: ${props => sizes[props.marginRight || props.margin]};
  margin-bottom: ${props => sizes[props.marginBottom || props.margin]};
  margin-left: ${props => sizes[props.marginLeft || props.margin]};
`;

export const extractSpacingProps = props =>
  reduce(
    props,
    (result, value, key) => {
      if (key.match(/padding|margin/g)) {
        result[key] = value;
      }

      return result;
    },
    {}
  );

export default withSpacing(Spacing);

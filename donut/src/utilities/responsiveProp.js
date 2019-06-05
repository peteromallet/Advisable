// A simple utility function to help keep things clean. The responsiveProp
// function can be used inside of styled components to make use of donut's
// responsive props functionality.
// font-size: ${props => responsiveProp(props, 'size', 'm')};
const responsiveProp = (props, prop, fallback) => {
  return props.theme.responsiveProp(props[prop]) || fallback;
};

export default responsiveProp;

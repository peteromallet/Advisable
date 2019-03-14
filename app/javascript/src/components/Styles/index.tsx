// Styles is a utility component that allows any CSS proporties to be passed
// through to styled-components. You should only use this compnent is there
// isn't already an existing component to do what you want. Even at that you
// should consider either creating a new component or using a separate styles.js
// file. The Styles component is primarily for layout primatives.

import styled from "styled-components";

const Styles = styled.div`${props => props}`

export default Styles
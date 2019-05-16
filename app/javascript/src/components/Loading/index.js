import React from "react";
import { Loading as Wrapper } from "./styles";
import loading from "./loading.svg";

const Loading = () => (
  <Wrapper>
    <img src={loading} />
  </Wrapper>
);

export default Loading;

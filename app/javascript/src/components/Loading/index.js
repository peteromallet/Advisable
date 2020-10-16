import { Loading as Wrapper } from "./styles";
import loading from "./loading.svg";

const Loading = ({ children }) => (
  <Wrapper>
    <img src={loading} />
    {children}
  </Wrapper>
);

export default Loading;

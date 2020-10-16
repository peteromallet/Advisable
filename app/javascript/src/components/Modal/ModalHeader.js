import { ModalHeader as StyledModalHeader } from "./styles";

export default function ModalHeader({ children }) {
  return (
    <StyledModalHeader>
      <div>{children}</div>
    </StyledModalHeader>
  );
}

import styled from "styled-components";

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
  border-radius: 4px;
  background: #e9ecf6;

  h4 {
    color: #00071f;
    margin-bottom: 10px;
  }

  a {
    color: #173fcd;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
  }
`;

export default function NoAvailability({ onRequestMoreTimes }) {
  return (
    <Wrapper>
      <h4>There are no more times available</h4>
      <a href="#" onClick={onRequestMoreTimes}>
        Request more availability
      </a>
    </Wrapper>
  );
}

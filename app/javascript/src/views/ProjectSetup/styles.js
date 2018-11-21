import styled from 'styled-components';

export const Container = styled.div.attrs({
  style: props => ({
    height: `${props.height}px`
  })
})`
  padding: 40px;
  max-width: 700px;
  position: relative;
  border-radius: 4px;
  background: #FFFFFF;
  margin: 60px auto 40px auto;
  box-shadow: 0px 15px 50px rgba(20, 41, 116, 0.09);

  @media (max-width: 700px) {
    margin: 0;
    padding: 20px;
    box-shadow: none;
    min-height: calc(100% - 62px);
  }
`

export const Step = styled.p`
  color: #8A90A6;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
  text-transform: uppercase;
`

export const StepHeading = styled.h1`
  color: #00104B;
  font-size: 28px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.05em;
`
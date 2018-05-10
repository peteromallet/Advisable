import styled from 'styled-components';
import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';

export const Name = styled.h3`
  color: #26234B;
  line-height: 1;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 3px;
  letter-spacing: -0.05em;
`

export const Location = styled.span`
  color: #736F9A;
  line-height: 1;
  font-size: 17px;
  font-weight: 400;
`

export const CandidateContent = styled.div`
  padding: 20px;
`

export const CandidateHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${Avatar} {
    flex-shrink: 0;
    margin-right: 15px;
  }
`

export const NameAndLocation = styled.div`
`

export const CandidateAttributes = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-right: 10px;
  justify-content: space-between;
`

export const Attribute = styled.div`

`

export const AttributeLabel = styled.span`
  color: #92A1B1;
  display: block;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 2px;
`

export const AttributeValue = styled.span`
  color: #21344A;
  display: block;
  font-size: 16px;
  font-weight: 500;
`

export const Card = styled.div`
  border-radius: 10px;
  background: #FFFFFF;
  margin-bottom: 20px;
  box-shadow: 0 15px 40px -15px rgba(55,69,120,0.20);
`

export const CandidateFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #F2F2F2;

  ${Button} {
    margin-right: 15px;
  }
`
export const Description = styled.div`
  margin-bottom: 30px;
`

export const Question = styled.div`
  margin-bottom: 30px;
`

export const QuestionTitle = styled.h5`
  margin-bottom: 10px;
`

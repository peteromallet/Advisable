import React from 'react';
import {
  Attribute,
  AttributeLabel,
  AttributeValue
} from './styles';

const CandidateAttribute = ({icon, label, value}) => (
  <Attribute>
    <AttributeLabel>{label}</AttributeLabel>
    <AttributeValue>{value}</AttributeValue>
  </Attribute>
)

export default CandidateAttribute

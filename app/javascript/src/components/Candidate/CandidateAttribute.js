import React from 'react';
import {
  Attribute,
  AttributeLabel
} from './styles';

const CandidateAttribute = ({icon, label, value}) => (
  <Attribute>
    <AttributeLabel>{label}</AttributeLabel>
    {value}
  </Attribute>
)

export default CandidateAttribute

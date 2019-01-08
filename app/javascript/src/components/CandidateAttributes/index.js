import React from "react";
import {
  CandidateAttributes,
  CandidateAttribute,
  CandidateAttributeLabel,
  CandidateAttributeValue,
  Linkedin
} from "./styles";

export default ({ rate, availability, linkedin, compact }) => (
  <CandidateAttributes compact={compact}>
    <CandidateAttribute>
      <CandidateAttributeLabel>Hourly rate</CandidateAttributeLabel>
      <CandidateAttributeValue>{rate || '-'}</CandidateAttributeValue>
    </CandidateAttribute>
    <CandidateAttribute>
      <CandidateAttributeLabel>Availabile to start</CandidateAttributeLabel>
      <CandidateAttributeValue>{availability || '-'}</CandidateAttributeValue>
    </CandidateAttribute>
    <CandidateAttribute>
      {linkedin && (
        <Linkedin href={linkedin} target="_blank">
          <svg width={24} height={24}>
            <path
              d="M21.5 0h-19A2.507 2.507 0 0 0 0 2.5v19C0 22.875 1.125 24 2.5 24h19c1.375 0 2.5-1.125 2.5-2.5v-19C24 1.125 22.875 0 21.5 0zm-15 4.734a1.766 1.766 0 1 1 0 3.533 1.766 1.766 0 0 1 0-3.533zm1.594 14.474H4.978V8.968h3.116v10.24zm11.906 0h-3.111v-5.092c0-1.163-.023-2.657-1.619-2.657-1.621 0-2.204 1.266-2.204 2.573v5.176H9.953V8.968h2.988v1.369h.042c.416-.787 1.768-1.618 3.283-1.618 3.151 0 3.734 2.075 3.734 4.774v5.715z"
            />
          </svg>
          View on Linkedin
        </Linkedin>
      )}
    </CandidateAttribute>
  </CandidateAttributes>
);

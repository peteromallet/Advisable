import React from "react";
import currency from "../../utilities/currency";
import AttributeList from "../AttributeList";

// Renders the attributes for a candidate. This is used to display the various
// attributes of an application in the sidebar on various views. e.g The
// individual candidate view and the messages sidebar.
const CandidateAttributeList = ({ application }) => {
  return (
    <AttributeList>
      {Boolean(application.rate) && (
        <AttributeList.Item
          label="Hourly Rate"
          value={currency(parseFloat(application.rate) * 100.0)}
        />
      )}
      <AttributeList.Item label="Available" value={application.availability} />
      {application.specialist.linkedin && (
        <AttributeList.Item
          label="Linkedin"
          value={
            <a href={application.specialist.linkedin} target="_blank">
              View on Linkedin
            </a>
          }
        />
      )}
    </AttributeList>
  );
};

export default CandidateAttributeList;

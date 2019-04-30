import React from "react";
import { get } from "lodash";
import { Divider, Padding, AttributeList } from "src/components";

const ProjectAttributes = ({ project }) => {
  return (
    <React.Fragment>
      <Padding top="m">
        <AttributeList>
          <AttributeList.Item
            label="Est. Budget"
            value={project.estimatedBudget}
          />
          <AttributeList.Item
            label="Location"
            value={
              project.remote ? "Remote" : get(project, "user.country.name")
            }
          />
        </AttributeList>
      </Padding>
    </React.Fragment>
  );
};

export default ProjectAttributes;

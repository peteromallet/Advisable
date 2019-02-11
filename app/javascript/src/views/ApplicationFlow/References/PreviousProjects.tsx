import * as React from "react";
import { Formik, Form } from "formik";
import { useScreenSize } from "../../../utilities/screenSizes";
import { Text, Heading, Padding, Button, Divider } from "../../../components";
import PreviousProject from "./PreviousProject";

const PreviousProjects = ({ previousProjects, onAdd }) => {
  const isMobile = useScreenSize("small");
  const handleSubmit = () => {};

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {formik => (
        <Form>
          <Padding size="xl">
            <Padding bottom="s">
              <Heading level={1}>References</Heading>
            </Padding>
            <Padding bottom="l">
              <Text>
                Select at least one previous project to include with your
                application. Try to include references that are related to the
                projects field.
              </Text>
            </Padding>
            <Padding bottom="xs">
              <Heading level={6}>Previous Projects</Heading>
            </Padding>
            {previousProjects.map(p => (
              <PreviousProject key={p.project.id} project={p.project} />
            ))}
            <Padding top="m">
              <Button size="l" type="button" styling="outlined" onClick={onAdd}>
                Add a previous project
              </Button>
            </Padding>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button styling="green" size="l">
                  Next
                </Button>
              </Padding>
            </React.Fragment>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PreviousProjects;

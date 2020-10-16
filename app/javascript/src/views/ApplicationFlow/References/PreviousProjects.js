import { Field } from "formik";
import { Stack } from "@advisable/donut";
import SubmitButton from "../../../components/SubmitButton";
import AddPreviousProjectButton from "../../../components/AddPreviousProjectButton";
import PreviousProject from "./PreviousProject";
import { ArrowRight } from "@styled-icons/feather";

const PreviousProjects = ({ previousProjects, modal }) => {
  return (
    <>
      <Stack mb="m" spacing="xs">
        {previousProjects.map((p) => (
          <Field
            type="checkbox"
            name="references"
            key={p.id}
            as={PreviousProject}
            value={p.id}
            project={p}
            disabled={p.draft}
            projectModal={modal}
          />
        ))}
      </Stack>
      <AddPreviousProjectButton modal={modal} mb="xl" />
      <SubmitButton size="l" mb="xl" suffix={<ArrowRight />}>
        Next
      </SubmitButton>
    </>
  );
};

export default PreviousProjects;

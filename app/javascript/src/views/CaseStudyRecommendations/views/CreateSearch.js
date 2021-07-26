import React from "react";
import { useHistory } from "react-router-dom";
import CaseStudySearchSkillsForm from "../components/CaseStudySearchSkillsForm";
import { useCreateCaseStudySearch } from "../queries";

export default function CreateSearch() {
  const [create] = useCreateCaseStudySearch();
  const history = useHistory();

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = await create({
      variables: {
        input: {
          skills: values.skills.map((s) => s.value),
        },
      },
    });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    const searchId = res.data?.createCaseStudySearch?.search.id;
    history.replace(`/explore/${searchId}/skills`);
    history.push(`/explore/${searchId}/goals`);
  };

  return (
    <CaseStudySearchSkillsForm
      initialValues={{ skills: [] }}
      onSubmit={handleSubmit}
    />
  );
}

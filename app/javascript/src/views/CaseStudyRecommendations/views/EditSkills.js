import React from "react";
import { useHistory, useParams } from "react-router-dom";
import CaseStudySearchSkillsForm from "../components/CaseStudySearchSkillsForm";
import { useUpdateCaseStudySearch } from "../queries";

export default function EditSkills({ caseStudySearch }) {
  const { id } = useParams();
  const history = useHistory();
  const [update] = useUpdateCaseStudySearch();

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = await update({
      variables: {
        input: {
          id,
          skills: values.skills.map((s) => s.value),
        },
      },
    });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    const searchId = res.data?.updateCaseStudySearch?.search.id;
    history.push(`/explore/${searchId}/goals`);
  };

  const initialSkills = caseStudySearch.skills.map((cs) => {
    return {
      value: cs.skill.name,
      label: cs.skill.name,
    };
  });

  return (
    <CaseStudySearchSkillsForm
      initialValues={{ skills: initialSkills }}
      onSubmit={handleSubmit}
    />
  );
}

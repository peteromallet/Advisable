import React from "react";
import ActionBar from "./ActionBar";
import { useRequestIntroduction } from "./queries";
import { CheckCircle } from "@styled-icons/boxicons-solid";

export default function AcceptApplication({ application }) {
  const [requestIntroduction] = useRequestIntroduction(application);

  const handleClick = async () => {
    await requestIntroduction({
      variables: {
        input: {
          application: application.id,
        },
      },
    });
  };

  return (
    <ActionBar.Item
      label="Accept"
      onClick={handleClick}
      icon={<CheckCircle />}
    />
  );
}

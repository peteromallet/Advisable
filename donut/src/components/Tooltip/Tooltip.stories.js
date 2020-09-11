import React from "react";
import Tooltip from ".";
import Text from "../Text";
import Link from "../Link";

export default {
  title: 'Content/Tooltip',
};

export const basicTooltip = () => {
  return (
    <div style={{ width: 550, margin: "50px auto" }}>
      <Tooltip
        interactable
        content={
          <>
            This means that we offer the client a guaranteed trial to work with
            you for up to 8 hours on a project you spec out. As long as the
            client agrees that you adhered to{" "}
            <Link
              as="a"
              display="inline"
              href="https://advisable.com/professional-standards"
              target="_blank"
            >
              Advisable's professional standards
            </Link>
            , you'll get paid for this trial period even if the client doesn't
            use your output or want to continue working with you after it.
          </>
        }
      >
        <Text color="blue.6">Advisable professional standards</Text>
      </Tooltip>
    </div>
  );
};

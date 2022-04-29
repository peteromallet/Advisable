import { useEffect } from "react";
import usePrevious from "src/utilities/usePrevious";
import useMediaQuery from "src/utilities/useMediaQuery";

function customerlyLoadOrUpdate(payload) {
  if (window.customerly.settings) {
    window.customerly.update(payload);
  } else {
    window.customerly.load(payload);
  }
}

export default function useCustomerly(viewer) {
  const previousID = usePrevious(viewer?.id);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!window.customerly) return;

    // VIEWER LOGGED OUT
    if (previousID && !viewer && window.customerly.settings) {
      window.customerly.logout();
      return;
    }

    if (viewer?.__typename === "User" && !viewer?.isAdmin) {
      customerlyLoadOrUpdate({
        visible: isDesktop,
        user_id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        company: {
          company_id: viewer.company?.id,
          name: viewer?.company?.name,
        },
        attributes: {
          account_type: "Client",
        },
      });
    }

    if (viewer?.__typename === "Specialist" && !viewer?.isAdmin) {
      customerlyLoadOrUpdate({
        visible: false,
        user_id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        attributes: {
          account_type: "Specialist",
        },
      });
    }

    if (!viewer) {
      customerlyLoadOrUpdate({ visible: false });
    }
  }, [viewer, previousID, isDesktop]);
}

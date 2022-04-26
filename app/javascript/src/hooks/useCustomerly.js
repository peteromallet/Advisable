import { useEffect } from "react";

export default function useCustomerly(viewer) {
  useEffect(() => {
    if (!window.customerly) return;

    if (!viewer) {
      window.customerly.update({ visible: false });
      if (window.customerly.logout) {
        window.customerly.logout();
      }
      return;
    }

    if (viewer.__typename === "User" && !viewer?.isAdmin) {
      window.customerly.update({
        visible: true,
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

    if (viewer.__typename === "Specialist" && !viewer?.isAdmin) {
      window.customerly.update({
        user_id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        attributes: {
          account_type: "Specialist",
        },
      });
    }
  }, [viewer]);
}

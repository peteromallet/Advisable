import Talk from "talkjs";
import { useEffect } from "react";

const useTalkjs = viewer => {
  useEffect(() => {
    if (!viewer) return;

    Talk.ready.then(function() {
      var me = new Talk.User({
        id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        role: viewer.__typename === "Specialist" ? "freelancer" : "client",
      });

      window.talkSession = new Talk.Session({
        appId: "tChLb3m5",
        me: me,
      });
    });
  }, [viewer]);
};

export default useTalkjs;

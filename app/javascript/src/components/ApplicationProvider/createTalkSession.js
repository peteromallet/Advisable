import Talk from "talkjs";
import { get } from "lodash";
import { useEffect, useState } from "react";

const createTalkSession = viewerQuery => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading === false) return;
    if (viewerQuery.loading) return;

    const viewer = viewerQuery.viewer;

    if (!viewer) {
      setLoading(false);
      return;
    }

    Talk.ready.then(() => {
      var me = new Talk.User({
        id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        photoUrl: get(viewer, "image.url"),
        role: viewer.__typename === "Specialist" ? "Specialist" : "Client",
      });

      const session = new Talk.Session({
        appId: process.env.TALKJS,
        me: me,
        signature: viewer.talkSignature,
      });

      setSession(session);
      setLoading(false);
    });
  }, [viewerQuery]);

  return { loading, session };
};

export default createTalkSession;

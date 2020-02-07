import Talk from "talkjs";
import clientConfig from "../clientConfig";

const createTalkSession = viewer => {
  const user = new Talk.User({
    id: viewer.id,
    name: viewer.name,
    email: viewer.email,
    photoUrl: viewer.image?.url,
    role: viewer.__typename === "Specialist" ? "Specialist" : "Client",
  });

  const session = new Talk.Session({
    me: user,
    appId: clientConfig.TALKJS,
    signature: viewer.talkSignature,
  });

  return session;
};

export default createTalkSession;

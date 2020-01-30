import Talk from "talkjs";

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
    appId: process.env.TALKJS,
    signature: viewer.talkSignature,
  });

  return session;
};

export default createTalkSession;

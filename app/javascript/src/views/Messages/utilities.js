export function isSpecialistAndUser(conversation) {
  const users = conversation.participants.filter((p) => Boolean(p.user));
  const specialists = conversation.participants.filter((p) =>
    Boolean(p.specialist),
  );
  return users.length === 1 && specialists.length === 1;
}

export function agreementForConversation(conversation) {
  let agreement;
  for (const p of conversation.participants) {
    const participantAgreement = p.user?.agreement || p.specialist?.agreement;
    if (participantAgreement) {
      agreement = participantAgreement;
      break;
    }
  }

  return agreement;
}

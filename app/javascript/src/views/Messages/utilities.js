export function isSpecialistAndUser(conversation) {
  const users = conversation.participants.filter((p) => Boolean(p.user));
  const specialists = conversation.participants.filter((p) =>
    Boolean(p.specialist),
  );
  return users.length === 1 && specialists.length === 1;
}

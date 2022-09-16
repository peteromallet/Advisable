const MESSAGES = {
  EMAIL_TAKEN:
    "This email address is already associated with an existing account.",
  ACCOUNT_NOT_FOUND:
    "Your account could not be found. You must first go through our application process.",
  ACCOUNT_EXISTS: "This account already exists",
  NON_CORPORATE_EMAIL:
    "You need to use a corporate email to sign up. Advisable is designed for companies that are hiring freelancers. If you’re a small business or individual, we recommend Upwork.",
  AUTHENTICATION_FAILED: "Invalid login credentials, please try again.",
  DOMAIN_MISMATCH: "You can not invite a user from another domain.",
  DEFAULT: "Something went wrong, please try again",
};

export default function messageForError(error) {
  const code = error?.extensions?.code;
  return MESSAGES[code] || MESSAGES.DEFAULT;
}

// Returns the redirect location for a graphql error based off of its error code
const handleAuthError = (error, location) => {
  let redirect;

  if (error.message === "signupRequired") {
    redirect = {
      pathname: error.extensions.redirect,
      search: `?email=${encodeURIComponent(error.extensions.email)}`,
      state: {
        from: location,
        notice: "projects.signupRequired",
      },
    };
  }

  if (error.message === "authenticationRequired") {
    redirect = {
      pathname: error.extensions.redirect,
      search: `?email=${encodeURIComponent(error.extensions.email)}`,
      state: {
        from: location,
      },
    };
  }

  return redirect;
};

export default handleAuthError;

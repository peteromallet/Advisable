export function handleAuthError(error, location) {
  const authError = error.graphQLErrors.find((e) => {
    return e.path?.join(".") === "project.viewerCanAccess";
  });

  if (authError?.extensions?.code === "SIGNUP_REQUIRED") {
    return {
      pathname: authError.extensions.url,
      search: `?email=${encodeURIComponent(authError.extensions.email)}`,
      state: {
        from: location,
        notice: "projects.signupRequired",
      },
    };
  }

  if (authError?.extensions?.code === "notAuthenticated") {
    return {
      pathname: "/login",
      state: {
        from: location,
      },
    };
  }
}

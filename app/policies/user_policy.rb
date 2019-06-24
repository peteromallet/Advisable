# Authorization logic for users. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.
class UserPolicy < BasePolicy
  # wether or not the user is the current user
  def is_user
    record == user
  end

  # Checks if the viewer ( as a specialist ) has applied to any of the users
  # projects
  def is_candidate_for_user_project
    user.projects.where(user: record).any?
  end
end

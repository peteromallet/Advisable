# frozen_string_literal: true

# Authorization logic for users. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.
class UserPolicy < BasePolicy
  # whether or not the user is the current user
  def user?
    record == user
  end

  # Checks if the specialist has applied to any of the users projects
  def candidate_for_user_project?
    user.is_a?(::Specialist) && user.projects.where(user: record).any?
  end

  def company_of_record
    record.company
  end
end

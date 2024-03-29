# frozen_string_literal: true

# Authorization logic for users. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.
class UserPolicy < BasePolicy
  # whether or not the user is the current user
  def current_user?
    record == current_user
  end
  alias_method :user?, :current_user?

  def invoices?
    owned_by_company? && team_manager?
  end
end

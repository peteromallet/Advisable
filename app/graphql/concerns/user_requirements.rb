# frozen_string_literal: true

module UserRequirements
  def current_user
    context[:current_user]
  end

  # Can return the user's account or admin's that's logged in as that user
  def current_account_id
    context[:current_account]&.id
  end

  def current_company
    current_user&.company
  end

  private

  def requires_current_user!
    return true if current_user.present?

    ApiError.not_authenticated
  end

  def requires_client!
    requires_current_user!
    return true if current_user.is_a?(::User)

    ApiError.invalid_request("MUST_BE_USER", "Current user must be a User.")
  end

  def requires_specialist!
    requires_current_user!
    return true if current_user.is_a?(Specialist)

    ApiError.invalid_request("MUST_BE_SPECIALIST", "Current user must be a Specialist.")
  end

  def requires_guild_user!
    requires_specialist!
    return true if current_user.guild

    ApiError.invalid_request("INVALID_PERMISSIONS", "Not a guild user")
  end

  def requires_team_manager!
    requires_client!
    return true if current_user.account.team_manager?

    ApiError.invalid_request("MUST_BE_TEAM_MANAGER", "Current user must have team management permission.")
  end
end

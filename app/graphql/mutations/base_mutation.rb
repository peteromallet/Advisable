class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  def current_user
    context[:current_user]
  end

  private

  def requires_current_user!
    return true if current_user.present?

    ApiError.not_authenticated
  end

  def requires_specialist!
    requires_current_user!

    return true if current_user.is_a?(Specialist)

    ApiError.invalid_request(
      code: "MUST_BE_SPECIALIST",
      message: "Current user must be a Specialist."
    )
  end

  def requires_guild_user!
    requires_current_user!
    return true if current_user&.guild

    ApiError.invalid_request(code: "invalidPermissions", message: "Not a guild user")
  end
end

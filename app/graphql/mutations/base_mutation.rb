class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  def current_user
    context[:current_user]
  end

  private

  # TODO: Thomas: do you have a better name suggestion?
  # just `responsible_for`?
  # or `with_current_account`?
  # or something else?
  def current_account_responsible_for(&block)
    Logidze.with_responsible(current_account_id, &block)
  end

  def current_account_id
    context[:current_account]&.id
  end

  def requires_current_user!
    return true if current_user.present?

    ApiError.not_authenticated
  end

  def requires_client!
    requires_current_user!

    return true if current_user.is_a?(User)

    ApiError.invalid_request(
      code: "MUST_BE_USER",
      message: "Current user must be a User."
    )
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
    return true if current_user.guild

    ApiError.invalid_request(code: "invalidPermissions", message: "Not a guild user")
  end
end

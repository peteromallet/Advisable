class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  def current_user
    context[:current_user]
  end

  private

  def requires_current_user!
    ApiError.not_authenticated if current_user.nil?
  end
end

class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  def current_user
    context[:current_user]
  end
end

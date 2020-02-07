class Mutations::ResendConfirmationEmail < GraphQL::Schema::Mutation
  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    unless context[:current_user]
      raise Service::Error.new('You are not authenticated')
    end

    context[:current_user].send_confirmation_email

    return { user: context[:current_user] }
  rescue Service::Error => e
    return { errors: [e] }
  end
end

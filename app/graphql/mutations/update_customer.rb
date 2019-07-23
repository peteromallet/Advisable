# The updateCustomer mutation is used to update the users Stripe customer data.
class Mutations::UpdateCustomer < Mutations::BaseMutation
  argument :user, String, required: true
  argument :name, String, required: true
  argument :email, String, required: true

  field :customer, Types::CustomerType, null: true
  field :errors, [Types::Error], null: true

  # clients submit deposit before they create their accounts, this should be
  # updated so that auth is required only when there is an active account
  # def authorized?(**args)
  #   return true if context[:current_user].is_a?(User)
  #   return false, { errors: [{ code: "notAuthorized" }] }
  # end

  def resolve(**args)
    user = User.find_by_uid(args[:user])
    customer = Stripe::Customer.update(
      user.stripe_customer_id, {
        name: args[:name],
        email: args[:email]
      }
    )

    return { customer: customer }
  end
end

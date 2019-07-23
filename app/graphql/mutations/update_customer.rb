# The updateCustomer mutation is used to update the users Stripe customer data.
class Mutations::UpdateCustomer < Mutations::BaseMutation
  argument :name, String, required: true
  argument :email, String, required: true

  field :customer, Types::CustomerType, null: true
  field :errors, [Types::Error], null: true

  # There must be a User logged in ( not a specialist )
  def authorized?(**args)
    return true if context[:current_user].is_a?(User)
    return false, { errors: [{ code: "notAuthorized" }] }
  end

  def resolve(**args)
    customer = Stripe::Customer.update(
      context[:current_user].stripe_customer_id, {
        name: args[:name],
        email: args[:email]
      }
    )

    return { customer: customer }
  end
end

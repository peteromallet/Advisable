# frozen_string_literal: true

module Mutations
  class UpdateUser < Mutations::BaseMutation
    argument :company_type, String, required: false
    argument :industry, String, required: false

    field :user, Types::User, null: true

    def authorized?(**_args)
      return true if current_user.is_a?(::User)

      ApiError.not_authenticated
    end

    def resolve(**args)
      user = current_user

      # If the users address has not yet been set then schedule the geocode job
      GeocodeUserJob.perform_later(user.id, context[:client_ip]) unless user.company.address.provided?

      company_args = {}

      company_args[:industry] = Industry.find_by!(name: args[:industry]) if args[:industry]
      company_args[:kind] = args[:company_type] if args[:company_type]

      user.company.update(company_args)

      current_account_responsible_for { user.save }
      user.sync_to_airtable

      {user: user}
    end
  end
end

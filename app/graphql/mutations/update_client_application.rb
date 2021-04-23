# frozen_string_literal: true

module Mutations
  class UpdateClientApplication < Mutations::BaseMutation
    description "Updates the users information during signup"

    argument :company_name, String, required: false
    argument :industry, String, required: false

    field :user, Types::User, null: true

    def authorized?(*_)
      requires_current_user!
      true
    end

    def resolve(**args)
      if current_user.application_status == "Application Started"
        update_company_details(current_user.company, args)
        current_user.save_and_sync!
      end

      {user: current_user}
    end

    private

    def update_company_details(company, args)
      company.name = args[:company_name] if args.key?(:company_name)
      company.industry = Industry.find_by_name!(args[:industry]) if args.key?(:industry)
      company.save!
    end
  end
end

# frozen_string_literal: true

module Mutations
  class UpdateCompany < Mutations::BaseMutation
    argument :audience, String, required: false
    argument :business_type, String, required: false
    argument :industry, ID, required: false
    argument :intent, String, required: false
    argument :kind, String, required: false
    argument :name, String, required: false

    field :user, Types::User, null: false

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      current_company.business_type = args[:business_type] if args[:business_type]
      assign_industry(args[:industry]) if args.key?(:industry)
      current_company.intent = args[:intent] if args[:intent]
      current_company.kind = args[:kind] if args[:kind]
      current_company.name = args[:name] if args[:name]
      current_company.audience = args[:audience] if args[:audience]

      current_account_responsible_for { current_company.save }

      {user: current_user}
    end

    private

    def assign_industry(id)
      return current_company.industry = nil if id.blank?

      current_company.industry = Industry.find_by("uid = :id OR name = :id", id:)
    end
  end
end

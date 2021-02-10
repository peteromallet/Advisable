# frozen_string_literal: true

module Types
  class CompanyType < Types::BaseType
    field :id, ID, null: false
    field :name, String, null: true
    field :kind, String, null: true
    field :industry, Types::IndustryType, null: true
    field :sales_person, Types::SalesPersonType, null: true
    field :bank_transfers_enabled, Boolean, null: true

    field :users, [Types::User], null: true do
      authorize :record_belongs_to_company?
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

# frozen_string_literal: true

module Types
  class CompanyType < Types::BaseType
    field :id, ID, null: false
    field :name, String, null: true
    field :kind, String, null: true
    field :industry, Types::IndustryType, null: true
    field :sales_person, Types::SalesPersonType, null: true

    field :bank_transfers_enabled, Boolean, null: true do
      authorize :record_belongs_to_company?
    end

    field :users, [Types::User], null: true do
      authorize :record_belongs_to_company?
    end

    def users
      object.users.active
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :projects, [Types::ProjectType], null: true do
      authorize :record_belongs_to_company?, :admin?
    end
    # Exclude any projects where the sales status is 'Lost'. We need to use an
    # or statement here otherwise SQL will also exclude records where sales_status
    # is null.
    def projects
      object.projects.where.not(sales_status: 'Lost').or(
        object.projects.where(sales_status: nil)
      ).order(created_at: :desc)
    end
  end
end

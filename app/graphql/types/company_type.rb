class Types::CompanyType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: true
  field :kind, String, null: true
  field :industry, Types::IndustryType, null: true
  field :sales_person, Types::SalesPersonType, null: true

  field :users, [Types::User], null: true do
    authorize :is_team_manager?
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
end

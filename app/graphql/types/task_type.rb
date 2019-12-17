class Types::TaskType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: true
  field :stage, String, null: true
  field :name, String, null: true
  field :repeat, String, null: true
  field :estimate, Int, null: true
  field :trial, Boolean, null: true
  field :hours_worked, Int, null: true
  field :flexible_estimate, Int, null: true
  field :pricing_type, String, null: true
  field :due_date, GraphQL::Types::ISO8601DateTime, null: true
  field :description, String, null: true
  field :application, Types::ApplicationType, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false

  def id
    object.uid
  end
end

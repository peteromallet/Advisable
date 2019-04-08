class Types::TaskType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :stage, String, null: true
  field :name, String, null: true
  field :estimate, Float, null: true
  field :due_date, GraphQL::Types::ISO8601DateTime, null: true
  field :description, String, null: true
  field :booking, Types::Booking, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false

  def id
    object.uid
  end
end

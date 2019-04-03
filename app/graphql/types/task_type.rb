class Types::TaskType < Types::BaseType
  field :id, ID, null: false
  field :stage, String, null: true
  field :name, String, null: true
  field :estimate, Float, null: true
  field :due_date, String, null: true
  field :description, String, null: true
  field :booking, Types::Booking, null: false

  def id
    object.airtable_id
  end
end

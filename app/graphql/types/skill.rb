class Types::Skill < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :goal_placeholder, String, null: true
  field :characteristic_placeholder, String, null: true

  def id
    object.airtable_id
  end
end

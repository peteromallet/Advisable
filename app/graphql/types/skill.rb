class Types::Skill < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false

  def id
    object.airtable_id
  end
end
